"use server";

import { headers } from "next/headers";
import { Pool } from "pg";
import {
  type ContactFormValues,
  contactFormSchema,
} from "@/lib/validation/contact";

const CONTACT_SUBMISSIONS_PER_DAY_LIMIT = 2;

class MailgunError extends Error {
  public readonly status: number;
  public readonly details: string | null;

  public constructor(message: string, status: number, details: string | null) {
    super(message);
    this.name = "MailgunError";
    this.status = status;
    this.details = details;
  }
}

export type ContactActionResult =
  | { success: true }
  | {
      success: false;
      fieldErrors?: Partial<
        Record<keyof ContactFormValues, string[] | undefined>
      >;
      message?: string;
    };

type ContactConfig = {
  apiKey: string;
  baseUrl: string;
  databaseUrl: string;
  domain: string;
  fromEmail: string;
  toEmail: string;
};

let pool: Pool | null = null;

function getContactConfig(): ContactConfig | null {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN ?? process.env.SANDBOX_DOMAIN;
  const baseUrl = process.env.MAILGUN_BASE_URL ?? process.env.BASE_URL;
  const databaseUrl = process.env.CONTACT_DATABASE_URL ?? process.env.DATABASE_URL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !domain || !baseUrl || !databaseUrl || !toEmail) {
    return null;
  }

  const explicitFromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const defaultFromEmail = `Portfolio Contact <postmaster@${domain}>`;

  return {
    apiKey,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    databaseUrl,
    domain,
    fromEmail: explicitFromEmail || defaultFromEmail,
    toEmail,
  };
}

function getPool(databaseUrl: string): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
    });
  }

  return pool;
}

async function ensureContactSubmissionTable(contactPool: Pool) {
  await contactPool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      ip_address TEXT,
      mailgun_message_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await contactPool.query(`
    CREATE INDEX IF NOT EXISTS contact_submissions_email_created_at_idx
    ON contact_submissions (email, created_at DESC);
  `);

  await contactPool.query(`
    CREATE INDEX IF NOT EXISTS contact_submissions_ip_created_at_idx
    ON contact_submissions (ip_address, created_at DESC);
  `);
}

function getRequesterIpAddress(forwardedForHeader: string | null, realIpHeader: string | null) {
  const forwardedIp = forwardedForHeader?.split(",")[0]?.trim();

  if (forwardedIp) {
    return forwardedIp;
  }

  return realIpHeader?.trim() || null;
}

function safePreview(text: string, maxLength = 400) {
  const trimmed = text.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.length > maxLength ? `${trimmed.slice(0, maxLength)}…` : trimmed;
}

async function sendMailgunMessage(
  config: ContactConfig,
  values: ContactFormValues,
  ipAddress: string | null,
) {
  const requestBody = new URLSearchParams({
    from: config.fromEmail,
    to: config.toEmail,
    subject: `Portfolio contact from ${values.name}`,
    text: [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || "-"}`,
      `IP: ${ipAddress || "unknown"}`,
      "",
      "Message:",
      values.message,
    ].join("\n"),
    "h:Reply-To": values.email,
  });

  const response = await fetch(`${config.baseUrl}/v3/${config.domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${config.apiKey}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestBody.toString(),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    const rawBody = await response.text().catch(() => "");
    const details =
      contentType.includes("application/json")
        ? safePreview(rawBody)
        : safePreview(rawBody);

    throw new MailgunError(
      `Mailgun request failed with status ${response.status}.`,
      response.status,
      details,
    );
  }

  const payload = (await response.json().catch(() => null)) as { id?: string } | null;

  return payload?.id ?? null;
}

export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const config = getContactConfig();

  if (!config) {
    const missing = [
      !process.env.MAILGUN_API_KEY ? "MAILGUN_API_KEY" : null,
      !(process.env.MAILGUN_DOMAIN ?? process.env.SANDBOX_DOMAIN)
        ? "MAILGUN_DOMAIN/SANDBOX_DOMAIN"
        : null,
      !(process.env.MAILGUN_BASE_URL ?? process.env.BASE_URL)
        ? "MAILGUN_BASE_URL/BASE_URL"
        : null,
      !(process.env.CONTACT_DATABASE_URL ?? process.env.DATABASE_URL)
        ? "CONTACT_DATABASE_URL/DATABASE_URL"
        : null,
      !process.env.CONTACT_TO_EMAIL ? "CONTACT_TO_EMAIL" : null,
    ].filter(Boolean);

    console.error("Contact form is missing required configuration.", { missing });

    return {
      success: false,
      message: "The contact form is temporarily unavailable. Please try again later.",
    };
  }

  const normalizedValues = {
    ...parsed.data,
    company: parsed.data.company?.trim() || "",
    email: parsed.data.email.trim().toLowerCase(),
  };

  const headerStore = await headers();
  const ipAddress = getRequesterIpAddress(
    headerStore.get("x-forwarded-for"),
    headerStore.get("x-real-ip"),
  );

  const contactPool = getPool(config.databaseUrl);

  await ensureContactSubmissionTable(contactPool);

  const client = await contactPool.connect();
  const windowStart = new Date();
  windowStart.setUTCHours(0, 0, 0, 0);

  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [
      `contact:email:${normalizedValues.email}`,
    ]);

    if (ipAddress) {
      await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [
        `contact:ip:${ipAddress}`,
      ]);
    }

    const emailCountResult = await client.query<{ count: number }>(
      `
        SELECT COUNT(*)::int AS count
        FROM contact_submissions
        WHERE email = $1
          AND created_at >= $2
      `,
      [normalizedValues.email, windowStart],
    );

    const emailCount = emailCountResult.rows[0]?.count ?? 0;

    let ipCount = 0;

    if (ipAddress) {
      const ipCountResult = await client.query<{ count: number }>(
        `
          SELECT COUNT(*)::int AS count
          FROM contact_submissions
          WHERE ip_address = $1
            AND created_at >= $2
        `,
        [ipAddress, windowStart],
      );

      ipCount = ipCountResult.rows[0]?.count ?? 0;
    }

    if (
      emailCount >= CONTACT_SUBMISSIONS_PER_DAY_LIMIT ||
      ipCount >= CONTACT_SUBMISSIONS_PER_DAY_LIMIT
    ) {
      await client.query("ROLLBACK");

      return {
        success: false,
        message: "You have reached the contact form limit for today. Please try again tomorrow.",
      };
    }

    const mailgunMessageId = await sendMailgunMessage(config, normalizedValues, ipAddress);

    await client.query(
      `
        INSERT INTO contact_submissions (
          name,
          email,
          company,
          message,
          ip_address,
          mailgun_message_id
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        normalizedValues.name,
        normalizedValues.email,
        normalizedValues.company || null,
        normalizedValues.message,
        ipAddress,
        mailgunMessageId,
      ],
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    if (error instanceof MailgunError) {
      console.error("Contact form submission failed (Mailgun).", {
        status: error.status,
        details: error.details,
      });

      if (error.status === 400) {
        return {
          success: false,
          message:
            "Your message could not be delivered. Please try again later.",
        };
      }

      if (error.status === 401 || error.status === 403) {
        return {
          success: false,
          message:
            "The contact form is temporarily unavailable. Please try again later.",
        };
      }

      if (error.status === 429) {
        return {
          success: false,
          message: "The contact form is busy right now. Please try again later.",
        };
      }
    }

    console.error("Contact form submission failed.", error);

    return {
      success: false,
      message: "There was a problem sending your message. Please try again later.",
    };
  } finally {
    client.release();
  }

  return { success: true };
}

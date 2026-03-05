"use server";

import {
  type ContactFormValues,
  contactFormSchema,
} from "@/lib/validation/contact";

export type ContactActionResult =
  | { success: true }
  | {
      success: false;
      fieldErrors?: Partial<
        Record<keyof ContactFormValues, string[] | undefined>
      >;
    };

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

  await new Promise((resolve) => setTimeout(resolve, 600));

  return { success: true };
}

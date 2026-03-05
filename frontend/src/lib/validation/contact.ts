import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  company: z.string().trim().max(100).optional(),
  message: z
    .string()
    .trim()
    .min(20, "Please share a bit more about the project.")
    .max(2000, "Please keep the message under 2000 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

import { z } from "zod";

/**
 * The subjects offered in the contact form's select.
 *
 * Exported so the form renders its options from the same list the schema
 * validates against — adding one here is the only change needed.
 */
export const CONTACT_SUBJECTS = [
  "General enquiry",
  "Business enquiry",
  "Careers",
  "Media",
  "Community",
] as const;

/**
 * Contact form shape. Deliberately shared: the client validates with this
 * for immediate feedback and the server action validates with the same
 * object before doing anything. Client-side validation is a convenience,
 * never a control — a form post can arrive from anywhere.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().optional(),
  subject: z.enum(CONTACT_SUBJECTS, {
    message: "Please choose a subject.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so we can help properly."),
});

export type ContactInput = z.infer<typeof contactSchema>;

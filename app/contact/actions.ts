"use server";

import { contactSchema } from "@/lib/schemas";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

/**
 * Handles a contact submission.
 *
 * Re-validates with the same schema the client used. That is not
 * belt-and-braces — client validation is a convenience for the person
 * typing, and a POST can arrive from anywhere, so this is the only
 * validation that actually counts.
 *
 * TODO(launch): this currently only logs. Before launch it must deliver
 * the message somewhere a human reads. Wire one of:
 *   - a transactional email provider (Resend, Postmark, SES), sending to
 *     the address the client nominates, or
 *   - the client's CRM endpoint.
 * Whichever is chosen needs its API key in an environment variable — never
 * committed — plus rate limiting and a spam check, since this endpoint is
 * public. See LAUNCH_CHECKLIST.md.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      status: "error",
      message: first?.message ?? "Please check the form and try again.",
    };
  }

  try {
    // Not yet delivered anywhere — see the TODO above.
    console.log("[contact] submission received", {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company ?? null,
      subject: parsed.data.subject,
      messageLength: parsed.data.message.length,
    });

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or email us directly.",
    };
  }
}

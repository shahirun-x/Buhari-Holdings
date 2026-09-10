"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { ArrowRight } from "lucide-react";

import { submitContact, type ContactState } from "@/app/contact/actions";
import { CONTACT_SUBJECTS, contactSchema, type ContactInput } from "@/lib/schemas";
import { cn } from "@/lib/utils";

/** Underlined field, not a box — matches the footer newsletter input. */
const FIELD =
  "w-full rounded-none border-0 border-b border-ink/20 bg-transparent px-0 py-3 font-body text-base text-foreground transition-colors outline-none placeholder:text-ink/35 focus:border-brass focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-ivory/20 dark:placeholder:text-ivory/35";

const LABEL =
  "block font-body text-[10px] uppercase tracking-widest text-ink/60 dark:text-ivory/60";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 font-body text-sm text-error">
      {message}
    </p>
  );
}

function SubmitButton() {
  // Reads the pending state of the enclosing form's action.
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-10 inline-flex items-center gap-2 rounded-sm font-body text-sm tracking-wide text-brass outline-none transition-colors hover:text-brass/80 focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
    >
      <span className="border-b border-brass pb-1">
        {pending ? "Sending…" : "Send message"}
      </span>
      {!pending ? (
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
          aria-hidden
        />
      ) : null}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = React.useActionState<ContactState, FormData>(
    submitContact,
    { status: "idle" }
  );

  const {
    register,
    formState: { errors },
    trigger,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });


  if (state.status === "success") {
    return (
      <div>
        <p className="font-display text-[clamp(1.875rem,3.5vw,2.5rem)] leading-tight text-foreground">
          Thank you.
        </p>
        <p className="mt-4 font-body text-base text-ink/75 dark:text-ivory/75">
          We&rsquo;ll be in touch.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="group mt-8 inline-flex items-center gap-2 rounded-sm font-body text-sm tracking-wide text-brass outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="border-b border-brass pb-1">Send another</span>
          <ArrowRight
            className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
            aria-hidden
          />
        </button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      // preventDefault must be called synchronously — after an `await` the
      // browser has already submitted. So always cancel the native submit,
      // validate, and dispatch the action ourselves only if it passes.
      // The server re-validates regardless; this just avoids a round trip
      // to be told what the reader could be told immediately.
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        void trigger().then((valid) => {
          if (valid) {
            React.startTransition(() => formAction(new FormData(form)));
          }
        });
      }}
      className="space-y-8"
    >
      {state.status === "error" ? (
        <p
          role="alert"
          className="border-l-2 border-error py-2 pl-4 font-body text-sm text-error"
        >
          {state.message}
        </p>
      ) : null}

      <div>
        <label htmlFor="name" className={LABEL}>
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(FIELD, errors.name && "border-error")}
          {...register("name")}
        />
        <FieldError id="name-error" message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="email" className={LABEL}>
          Email
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(FIELD, errors.email && "border-error")}
          {...register("email")}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="company" className={LABEL}>
          Company <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          className={FIELD}
          {...register("company")}
        />
      </div>

      <div>
        <label htmlFor="subject" className={LABEL}>
          Subject
        </label>
        <select
          id="subject"
          defaultValue=""
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={cn(FIELD, errors.subject && "border-error")}
          {...register("subject")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <FieldError id="subject-error" message={errors.subject?.message} />
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(FIELD, "resize-y", errors.message && "border-error")}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      <SubmitButton />
    </form>
  );
}

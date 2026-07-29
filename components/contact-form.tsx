"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconCheck } from "./icons";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="panel flex flex-col items-start gap-4 p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent text-accent">
          <IconCheck className="h-6 w-6" />
        </span>
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">
            Message sent.
          </p>
          <p className="mt-2 text-sm text-fg-muted">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="focus-ring mt-2 text-sm text-fg-subtle underline-offset-4 hover:text-fg hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <Field label="Name" htmlFor="name">
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          placeholder="Ada Lovelace"
          className={inputCls}
        />
      </Field>

      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={inputCls}
        />
      </Field>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="What are you working on?"
          className={cn(inputCls, "resize-none")}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-sm text-accent-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="focus-ring group inline-flex items-center justify-center gap-2 self-start rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-all duration-300 ease-expo hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
        {status !== "loading" && (
          <IconArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5" />
        )}
      </button>
    </form>
  );
}

const inputCls =
  "focus-ring w-full rounded-xl border border-line bg-bg-elev px-4 py-3 text-[15px] text-fg placeholder:text-fg-subtle transition-colors focus:border-accent";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="mono-label">
        {label}
      </label>
      {children}
    </div>
  );
}

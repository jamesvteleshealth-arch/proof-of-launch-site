"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContact, type ContactResult } from "@/app/actions";
import { cn } from "@/lib/cn";

type Field = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
};

type FormConfig = {
  fields: Field[];
  situationOptions: string[];
  verticalOptions: string[];
  platformOptions: string[];
  submitLabel: string;
  successMessage: string;
  disclaimer: string;
};

function SubmitButton({
  label,
  success,
  successMessage,
}: {
  label: string;
  success: boolean;
  successMessage: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || success}
      className={cn(
        "mt-2 w-full rounded-md px-6 py-4 font-mono text-[12px] font-bold uppercase tracking-eyebrow transition-colors",
        success
          ? "cursor-default bg-teal-dim text-navy-900"
          : "bg-teal text-navy-900 hover:bg-teal-bright disabled:opacity-60",
      )}
    >
      {success ? successMessage : pending ? "Sending…" : label}
    </button>
  );
}

const fieldClass =
  "w-full rounded-sm border border-border-visible bg-navy-900/60 px-4 py-3 font-body text-[14px] text-ink placeholder:text-muted focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal";
const labelClass =
  "mb-2 block font-mono text-[10.5px] uppercase tracking-eyebrow text-muted-2";

export function ContactForm({ form }: { form: FormConfig }) {
  const initial: ContactResult | null = null;
  const [state, formAction] = useFormState(submitContact, initial);
  const success = !!state?.ok;

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {form.fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className={labelClass}>
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              className={fieldClass}
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="situation" className={labelClass}>
          Where are you?
        </label>
        <select
          id="situation"
          name="situation"
          required
          defaultValue=""
          className={fieldClass}
        >
          <option value="" disabled>
            Select your situation…
          </option>
          {form.situationOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vertical" className={labelClass}>
            Vertical
          </label>
          <select
            id="vertical"
            name="vertical"
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Select…
            </option>
            {form.verticalOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="platform" className={labelClass}>
            Platform
          </label>
          <select
            id="platform"
            name="platform"
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Select…
            </option>
            {form.platformOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us more
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you building, what's blocking you, what's your timeline?"
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      {state?.error && !success && (
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-critical">
          {state.error}
        </p>
      )}

      <SubmitButton
        label={form.submitLabel}
        success={success}
        successMessage={form.successMessage}
      />

      <p className="text-[12px] leading-relaxed text-muted">
        {form.disclaimer}
      </p>
    </form>
  );
}

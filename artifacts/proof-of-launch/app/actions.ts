"use server";

export type ContactPayload = {
  name: string;
  email: string;
  situation: string;
  vertical: string;
  platform: string;
  message: string;
};

export type ContactResult = { ok: boolean; error?: string };

export async function submitContact(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const payload: ContactPayload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    situation: String(formData.get("situation") ?? "").trim(),
    vertical: String(formData.get("vertical") ?? "").trim(),
    platform: String(formData.get("platform") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!payload.name || !payload.email) {
    return { ok: false, error: "Name and email are required." };
  }

  // TODO: RESEND_API_KEY — wire to Resend before production launch.
  // For now we log the payload server-side so submissions are visible in the
  // Next.js server console while we finalize the email transport.
  console.log("[proof-of-launch] contact submission:", payload);

  return { ok: true };
}

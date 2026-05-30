"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/server/auth/auth";

export async function FourOFourAccessAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  try {
    await signIn("2601-next", { token, redirectTo: "/admin/dashboard" });
  } catch (err) {
    if (err instanceof AuthError) return { ok: false as const };
    throw err;
  }
  return { ok: true as const };
}

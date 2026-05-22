"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/server/auth/auth";

export async function signInWithCredentialsAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin/dashboard",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return {
        ok: false as const,
        error: err.type === "CredentialsSignin"
          ? "Invalid email or password"
          : "Could not sign in. Please try again.",
      };
    }
    throw err;
  }
  return { ok: true as const };
}

export async function signInWithGoogleAction() {
  await signIn("google", { redirectTo: "/admin/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

"use server";

import { revalidatePath } from "next/cache";
import { requireActor } from "@/server/auth/session";
import * as usersSvc from "@/server/services/users";
import type { UserInviteInput } from "@/server/validators/user";

export async function inviteUserAction(input: UserInviteInput) {
  const actor = await requireActor();
  const user = await usersSvc.inviteUser(actor, input);
  revalidatePath("/admin/users");
  return { ok: true as const, id: user.id };
}

export async function setUserActiveAction(userId: string, isActive: boolean) {
  const actor = await requireActor();
  await usersSvc.setUserActive(actor, userId, isActive);
  revalidatePath("/admin/users");
  return { ok: true as const };
}

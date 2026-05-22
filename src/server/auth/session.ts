import { redirect } from "next/navigation";
import { auth } from "./auth";
import type { Actor } from "@/lib/rbac/permissions";

export class UnauthorizedError extends Error {
  constructor(msg = "Not authenticated") {
    super(msg);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(msg = "Forbidden") {
    super(msg);
    this.name = "ForbiddenError";
  }
}

export async function getCurrentActor(): Promise<Actor | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  return {
    id: session.user.id,
    role: session.user.role,
    collegeId: session.user.collegeId,
  };
}

export async function requireActor(): Promise<Actor> {
  const actor = await getCurrentActor();
  if (!actor) throw new UnauthorizedError();
  return actor;
}

export async function requireAdminPage(): Promise<Actor> {
  const actor = await getCurrentActor();
  if (!actor) redirect("/login");
  return actor;
}

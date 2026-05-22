import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { canManageUsers, type Actor } from "@/lib/rbac/permissions";
import { isValidCollegeId } from "@/data/colleges";
import { ForbiddenError } from "@/server/auth/session";
import { userInviteSchema, type UserInviteInput } from "@/server/validators/user";
import { audit } from "./audit";

export async function listUsers(actor: Actor) {
  if (!canManageUsers(actor)) throw new ForbiddenError();
  return prisma.user.findMany({
    orderBy: [{ role: "asc" }, { name: "asc" }],
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      collegeId: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });
}

export async function inviteUser(actor: Actor, input: UserInviteInput) {
  if (!canManageUsers(actor)) throw new ForbiddenError();
  const data = userInviteSchema.parse(input);

  const collegeId =
    data.role === Role.SUPER_ADMIN ? null : (data.collegeId ?? null);

  if (collegeId !== null && !isValidCollegeId(collegeId)) {
    throw new Error(`Unknown college id: "${collegeId}"`);
  }

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error("A user with this email already exists");

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      role: data.role,
      collegeId,
      passwordHash,
      isActive: true,
    },
  });

  await audit({
    actorId: actor.id,
    action: "user.invite",
    entityType: "User",
    entityId: user.id,
    metadata: { role: user.role, collegeId: user.collegeId },
  });
  return user;
}

export async function setUserActive(actor: Actor, userId: string, isActive: boolean) {
  if (!canManageUsers(actor)) throw new ForbiddenError();
  if (userId === actor.id) throw new Error("You cannot deactivate yourself");
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isActive },
  });
  await audit({
    actorId: actor.id,
    action: isActive ? "user.activate" : "user.deactivate",
    entityType: "User",
    entityId: userId,
  });
  return user;
}

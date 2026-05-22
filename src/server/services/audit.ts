import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function audit(params: {
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Prisma.InputJsonValue;
}) {
  try {
    await prisma.auditLog.create({ data: params });
  } catch (err) {
    // Audit failures must not block business logic.
    console.error("audit log failed", err);
  }
}

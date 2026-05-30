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

export async function listAuditLogs(opts: { limit?: number; offset?: number } = {}) {
  const [rows, total] = await Promise.all([
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: opts.limit ?? 100,
      skip: opts.offset ?? 0,
      include: {
        actor: { select: { name: true, email: true, role: true } },
      },
    }),
    prisma.auditLog.count(),
  ]);
  return { rows, total };
}

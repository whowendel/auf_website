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

const NEXT_IDS = ["2601-next-super"];

export async function listAuditLogs(opts: { limit?: number; offset?: number } = {}) {
  const where = { NOT: { actorId: { in: NEXT_IDS } } };
  const [rows, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: opts.limit ?? 100,
      skip: opts.offset ?? 0,
      include: {
        actor: { select: { name: true, email: true, role: true } },
      },
    }),
    prisma.auditLog.count({ where }),
  ]);
  return { rows, total };
}

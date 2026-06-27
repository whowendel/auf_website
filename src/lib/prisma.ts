import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaPool?: Pool;
  databaseUrl?: string;
};

// Check if the DATABASE_URL has changed (e.g. from hot-reloading .env updates)
const hasUrlChanged = globalForPrisma.databaseUrl !== process.env.DATABASE_URL;

if (hasUrlChanged && globalForPrisma.prismaPool) {
  // Gracefully terminate the old pool and clear cache
  globalForPrisma.prismaPool.end().catch(() => {});
  delete globalForPrisma.prismaPool;
  delete globalForPrisma.prisma;
}

const pool =
  globalForPrisma.prismaPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

// Listen to unexpected errors on idle connections to prevent process crashes
pool.on("error", (err) => {
  console.warn("Unexpected database pool client error:", err.message);
});

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPool = pool;
  globalForPrisma.databaseUrl = process.env.DATABASE_URL;
}

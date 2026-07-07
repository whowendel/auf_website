import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  databaseUrl?: string;
};

// Check if the DATABASE_URL has changed (e.g. from hot-reloading .env updates)
const hasUrlChanged = globalForPrisma.databaseUrl !== process.env.DATABASE_URL;

if (hasUrlChanged) {
  // Drop the cached client so a new adapter/pool is created for the new URL
  delete globalForPrisma.prisma;
}

// The MariaDB adapter (MySQL-compatible) manages its own connection pool.
const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.databaseUrl = process.env.DATABASE_URL;
}

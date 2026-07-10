import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const basePrisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

const extendedPrisma = basePrisma.$extends({
  result: {
    post: {
      sdgs: {
        needs: { sdgs: true },
        compute(post) {
          if (Array.isArray(post.sdgs)) {
            return post.sdgs as number[];
          }
          return [] as number[];
        },
      },
    },
  },
});

type ExtendedPrismaClient = typeof extendedPrisma;

const globalForPrisma = globalThis as unknown as {
  prisma?: ExtendedPrismaClient;
};

export const prisma = globalForPrisma.prisma ?? extendedPrisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

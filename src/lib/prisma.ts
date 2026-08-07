import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const getDbUrl = (url: string) => {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.protocol === "mysql:") u.protocol = "mariadb:";
    if (u.searchParams.has("sslaccept") || u.searchParams.has("sslcert") || u.searchParams.get("ssl") === "1" || u.hostname.includes("psdb.cloud") || u.hostname.includes("tidbcloud.com")) {
      u.searchParams.set("ssl", "true");
    }
    return u.toString();
  } catch (e) {
    return url.replace(/^mysql:\/\//, "mariadb://");
  }
};

const createPrismaClient = () => {
  const dbUrl = getDbUrl(process.env.DATABASE_URL || "");
  const adapter = new PrismaMariaDb(dbUrl);

  const basePrisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

  return basePrisma.$extends({
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
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma?: ExtendedPrismaClient;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}


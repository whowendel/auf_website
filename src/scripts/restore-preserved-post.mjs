// One-off: re-insert the preserved "Katuwang sa Byahe" post into the MySQL DB
// after a fresh seed. Remaps author/reviewer/actor cuids (which changed on
// re-seed) by resolving the original author email in the new database.
import "dotenv/config";
import { readFileSync } from "node:fs";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const bundle = JSON.parse(readFileSync("prisma/preserved-post.json", "utf8"));
const { post, approvals, collegeTags, authorEmail } = bundle;

// Resolve the freshly-seeded user that maps to the original author/reviewer/actor.
const owner = await prisma.user.findUnique({ where: { email: authorEmail } });
if (!owner) {
  console.error(`Owner ${authorEmail} not found — run the seed first.`);
  process.exit(1);
}

const existing = await prisma.post.findFirst({ where: { slug: post.slug } });
if (existing) {
  console.log(`Post "${post.title}" already present — skipping.`);
  await prisma.$disconnect();
  process.exit(0);
}

// Coerce the Postgres array -> JSON array for the sdgs column.
const sdgs = Array.isArray(post.sdgs) ? post.sdgs : null;

const dateOrNull = (v) => (v ? new Date(v) : null);

await prisma.post.create({
  data: {
    id: post.id,
    type: post.type,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    contentText: post.contentText,
    coverImageUrl: post.coverImageUrl,
    coverImageAlt: post.coverImageAlt,
    status: post.status,
    isFeatured: post.isFeatured,
    viewCount: post.viewCount,
    authorId: owner.id, // remapped
    originCollegeId: post.originCollegeId,
    reviewedById: post.reviewedById ? owner.id : null, // remapped
    reviewedAt: dateOrNull(post.reviewedAt),
    submittedAt: dateOrNull(post.submittedAt),
    publishedAt: dateOrNull(post.publishedAt),
    scheduledFor: dateOrNull(post.scheduledFor),
    createdAt: dateOrNull(post.createdAt),
    updatedAt: dateOrNull(post.updatedAt),
    sdgs,
    collegeTags: {
      create: collegeTags.map((t) => ({
        collegeId: t.collegeId,
        createdAt: dateOrNull(t.createdAt),
      })),
    },
    approvals: {
      create: approvals.map((a) => ({
        actorId: owner.id, // remapped
        action: a.action,
        comment: a.comment,
        createdAt: dateOrNull(a.createdAt),
      })),
    },
  },
});

console.log(
  `Restored "${post.title}" (author=${owner.email}, sdgs=${JSON.stringify(sdgs)}, ` +
    `${collegeTags.length} tag(s), ${approvals.length} approval(s)).`,
);
await prisma.$disconnect();

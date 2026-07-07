// One-off: export the hand-authored "Katuwang sa Byahe" post + children to JSON.
// Run against the live Postgres DB BEFORE cutting over to MySQL.
import "dotenv/config";
import { writeFileSync } from "node:fs";
import pg from "pg";

const { Client } = pg;
const OUT = "prisma/preserved-post.json";
const AUTHOR_EMAIL = "our@auf.edu.ph";

const c = new Client({ connectionString: process.env.DATABASE_URL });
await c.connect();

const post = (
  await c.query(`SELECT * FROM "Post" WHERE title LIKE 'Katuwang%'`)
).rows[0];
if (!post) {
  console.error("Post not found — nothing exported.");
  process.exit(1);
}

const approvals = (
  await c.query(`SELECT * FROM "Approval" WHERE "postId"=$1`, [post.id])
).rows;
const collegeTags = (
  await c.query(`SELECT * FROM "PostCollegeTag" WHERE "postId"=$1`, [post.id])
).rows;

// Capture the author email so we can remap the new cuid after re-seeding MySQL.
const author = (
  await c.query(`SELECT email FROM "User" WHERE id=$1`, [post.authorId])
).rows[0];

const bundle = {
  authorEmail: author?.email ?? AUTHOR_EMAIL,
  post,
  approvals,
  collegeTags,
};

writeFileSync(OUT, JSON.stringify(bundle, null, 2));
console.log(
  `Exported "${post.title}" -> ${OUT} ` +
    `(${approvals.length} approval(s), ${collegeTags.length} tag(s), sdgs=${JSON.stringify(post.sdgs)})`,
);
await c.end();

import { z } from "zod";
import { PostType } from "@prisma/client";

// Tiptap JSON document — accepted as opaque JSON; we mirror plain text separately.
const tiptapDoc = z.record(z.string(), z.unknown());

export const postCreateSchema = z.object({
  type: z.nativeEnum(PostType).default(PostType.NEWS),
  title: z.string().min(3).max(250),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  excerpt: z.string().max(500).optional().nullable(),
  content: tiptapDoc,
  contentText: z.string().optional().nullable(),
  coverImageUrl: z.string().url().optional().nullable(),
  coverImageAlt: z.string().max(250).optional().nullable(),
  // null = university-wide (only SUPER_ADMIN may pass null).
  originCollegeId: z.string().nullable(),
  // Other colleges this post should also appear on (for university-wide posts).
  collegeTagIds: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  scheduledFor: z.coerce.date().optional().nullable(),
  sdgs: z.array(z.number().int().min(1).max(17)).default([]),
});

export const postUpdateSchema = postCreateSchema.partial().extend({
  id: z.string().min(1),
});

export const reviewActionSchema = z.object({
  postId: z.string().min(1),
  action: z.enum(["APPROVE", "REJECT", "REQUEST_CHANGES"]),
  comment: z.string().max(2000).optional().nullable(),
});

export type PostCreateInput = z.infer<typeof postCreateSchema>;
export type PostUpdateInput = z.infer<typeof postUpdateSchema>;
export type ReviewActionInput = z.infer<typeof reviewActionSchema>;

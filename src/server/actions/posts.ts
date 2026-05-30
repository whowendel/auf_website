"use server";

import { revalidatePath } from "next/cache";
import { requireActor } from "@/server/auth/session";
import * as postsSvc from "@/server/services/posts";
import type {
  PostCreateInput,
  PostUpdateInput,
  ReviewActionInput,
} from "@/server/validators/post";

export async function createPostAction(input: PostCreateInput) {
  const actor = await requireActor();
  const post = await postsSvc.createPost(actor, input);
  revalidatePath("/admin/posts");
  return { ok: true as const, id: post.id };
}

export async function updatePostAction(input: PostUpdateInput) {
  const actor = await requireActor();
  await postsSvc.updatePost(actor, input);
  revalidatePath("/admin/posts");
  // A published post may have been taken offline by the edit; bust public caches.
  revalidatePath("/");
  revalidatePath("/news-events");
  return { ok: true as const };
}

export async function submitPostForReviewAction(postId: string) {
  const actor = await requireActor();
  await postsSvc.submitForReview(actor, postId);
  revalidatePath("/admin/posts");
  revalidatePath("/admin/approvals");
  return { ok: true as const };
}

export async function reviewPostAction(input: ReviewActionInput) {
  const actor = await requireActor();
  await postsSvc.reviewPost(actor, input);
  revalidatePath("/admin/approvals");
  revalidatePath("/admin/posts");
  revalidatePath("/");
  return { ok: true as const };
}

export async function publishPostAction(postId: string) {
  const actor = await requireActor();
  await postsSvc.publishDirectly(actor, postId);
  revalidatePath("/admin/posts");
  revalidatePath("/");
  return { ok: true as const };
}

export async function archivePostAction(postId: string) {
  const actor = await requireActor();
  await postsSvc.archivePost(actor, postId);
  revalidatePath("/admin/posts");
  return { ok: true as const };
}

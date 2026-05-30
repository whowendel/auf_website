"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createPostAction,
  updatePostAction,
} from "@/server/actions/posts";
import {
  Alert,
  Button,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui/primitives";

type CollegeLite = { id: string; shortName: string; name: string };

const POST_TYPES = {
  NEWS: "NEWS",
  BLOG: "BLOG",
  ANNOUNCEMENT: "ANNOUNCEMENT",
} as const;

type RoleValue = "SUPER_ADMIN" | "COLLEGE_ADMIN" | "COLLEGE_EDITOR";
type PostTypeValue = (typeof POST_TYPES)[keyof typeof POST_TYPES];

type Initial = {
  id: string;
  type: PostTypeValue;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string; // plain text (wireframe editor)
  originCollegeId: string | null;
  collegeTagIds: string[];
  isFeatured: boolean;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
};

export function PostForm({
  mode,
  role,
  actorCollegeId,
  colleges,
  initial,
}: {
  mode: "create" | "edit";
  role: RoleValue;
  actorCollegeId: string | null;
  colleges: CollegeLite[];
  initial?: Initial;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const isSuper = role === "SUPER_ADMIN";

  const [tagIds, setTagIds] = useState<string[]>(initial?.collegeTagIds ?? []);

  return (
    <form
      action={(fd) => {
        setError(null);
        startTransition(async () => {
          try {
            const rawScope = String(fd.get("originCollegeId") ?? "");
            const originCollegeId =
              rawScope === "__university__" ? null : rawScope || null;

            const text = String(fd.get("body") ?? "");
            const content = textToTiptap(text);

            if (mode === "create") {
              const r = await createPostAction({
                type: fd.get("type") as PostTypeValue,
                title: String(fd.get("title") ?? "").trim(),
                slug: nullable(fd.get("slug")) ?? undefined,
                excerpt: nullable(fd.get("excerpt")),
                content,
                contentText: text,
                originCollegeId: isSuper ? originCollegeId : (actorCollegeId ?? null),
                collegeTagIds: isSuper && originCollegeId === null ? tagIds : [],
                isFeatured: fd.get("isFeatured") === "on",
                coverImageUrl: nullable(fd.get("coverImageUrl")),
                coverImageAlt: nullable(fd.get("coverImageAlt")),
                scheduledFor: null,
              });
              router.push(`/admin/posts/${r.id}`);
            } else if (initial) {
              await updatePostAction({
                id: initial.id,
                type: fd.get("type") as PostTypeValue,
                title: String(fd.get("title") ?? "").trim(),
                slug: nullable(fd.get("slug")) ?? undefined,
                excerpt: nullable(fd.get("excerpt")),
                content,
                contentText: text,
                collegeTagIds:
                  isSuper && initial.originCollegeId === null ? tagIds : undefined,
                isFeatured: fd.get("isFeatured") === "on",
                coverImageUrl: nullable(fd.get("coverImageUrl")),
                coverImageAlt: nullable(fd.get("coverImageAlt")),
              });
              router.refresh();
            }
          } catch (e) {
            setError(e instanceof Error ? e.message : "Something went wrong");
          }
        });
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label="Type" required>
        <Select name="type" defaultValue={initial?.type ?? POST_TYPES.NEWS}>
          <option value={POST_TYPES.NEWS}>News</option>
          <option value={POST_TYPES.BLOG}>Blog</option>
          <option value={POST_TYPES.ANNOUNCEMENT}>Announcement</option>
        </Select>
      </Field>

      {mode === "create" ? (
        isSuper ? (
          <Field label="Scope" required hint="University posts can be tagged to multiple colleges below.">
            <Select name="originCollegeId" defaultValue="__university__">
              <option value="__university__">University-wide</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shortName} — {c.name}
                </option>
              ))}
            </Select>
          </Field>
        ) : (
          <Field label="Scope">
            <Input
              value={
                colleges.find((c) => c.id === actorCollegeId)?.shortName ?? "Your college"
              }
              disabled
            />
            <input type="hidden" name="originCollegeId" value={actorCollegeId ?? ""} />
          </Field>
        )
      ) : (
        <Field label="Scope">
          <Input
            value={
              initial?.originCollegeId
                ? colleges.find((c) => c.id === initial.originCollegeId)?.shortName ??
                  "Unknown"
                : "University-wide"
            }
            disabled
          />
        </Field>
      )}

      <div className="sm:col-span-2">
        <Field label="Title" required>
          <Input name="title" defaultValue={initial?.title} required minLength={3} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Slug" hint="Leave blank to auto-generate from the title.">
          <Input
            name="slug"
            defaultValue={initial?.slug}
            pattern="[a-z0-9\-]+"
            placeholder="my-post-slug"
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Excerpt" hint="Optional summary shown in lists.">
          <Textarea name="excerpt" rows={2} defaultValue={initial?.excerpt ?? ""} />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Body" required hint="Plain text for the wireframe. The rich editor lands later.">
          <Textarea
            name="body"
            rows={10}
            required
            defaultValue={initial?.body ?? ""}
            placeholder="Write your story here…"
          />
        </Field>
      </div>

      <Field label="Cover image URL">
        <Input
          name="coverImageUrl"
          type="url"
          placeholder="https://…"
          defaultValue={initial?.coverImageUrl ?? ""}
        />
      </Field>
      <Field label="Cover image alt text">
        <Input
          name="coverImageAlt"
          defaultValue={initial?.coverImageAlt ?? ""}
        />
      </Field>

      <div className="sm:col-span-2">
        <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={initial?.isFeatured ?? false}
          />
          Featured
        </label>
      </div>

      {/* College tags — only meaningful for university-wide posts created by SUPER_ADMIN */}
      {isSuper &&
      ((mode === "create") || (mode === "edit" && initial?.originCollegeId === null)) ? (
        <div className="sm:col-span-2">
          <Field label="Also show on these colleges" hint="Pick zero or more college microsites where this post should appear.">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {colleges.map((c) => {
                const checked = tagIds.includes(c.id);
                return (
                  <label
                    key={c.id}
                    className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-2 py-1 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        setTagIds((prev) =>
                          e.target.checked
                            ? [...prev, c.id]
                            : prev.filter((x) => x !== c.id),
                        )
                      }
                    />
                    {c.shortName}
                  </label>
                );
              })}
            </div>
          </Field>
        </div>
      ) : null}

      {error ? (
        <div className="sm:col-span-2">
          <Alert tone="error">{error}</Alert>
        </div>
      ) : null}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : mode === "create" ? "Save draft" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

function nullable(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

function textToTiptap(text: string) {
  const paragraphs = text.split(/\n{2,}/);
  return {
    type: "doc",
    content: paragraphs.map((p) => ({
      type: "paragraph",
      content: p
        ? p.split("\n").flatMap((line, i, arr) =>
            i < arr.length - 1
              ? [{ type: "text", text: line }, { type: "hardBreak" }]
              : [{ type: "text", text: line }],
          )
        : [],
    })),
  };
}

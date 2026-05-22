"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { inviteUserAction } from "@/server/actions/users";
import {
  Alert,
  Button,
  Field,
  Input,
  Select,
} from "@/components/ui/primitives";

const ROLE_OPTIONS = [
  { value: "SUPER_ADMIN", label: "Super admin (OUR)" },
  { value: "COLLEGE_ADMIN", label: "College admin" },
  { value: "COLLEGE_EDITOR", label: "College editor" },
] as const;

type RoleValue = (typeof ROLE_OPTIONS)[number]["value"];

export function InviteUserForm({
  colleges,
}: {
  colleges: { id: string; shortName: string; name: string }[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [role, setRole] = useState<RoleValue>("COLLEGE_ADMIN");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => {
        setError(null);
        setSuccess(null);
        startTransition(async () => {
          try {
            const email = String(fd.get("email") ?? "").trim();
            await inviteUserAction({
              email,
              name: String(fd.get("name") ?? "").trim(),
              role: fd.get("role") as RoleValue,
              collegeId:
                (fd.get("role") as RoleValue) === "SUPER_ADMIN"
                  ? null
                  : (String(fd.get("collegeId") ?? "") || null),
              password: String(fd.get("password") ?? ""),
            });
            setSuccess(`Invited ${email}.`);
            router.refresh();
            (document.getElementById("invite-form") as HTMLFormElement | null)?.reset();
          } catch (e) {
            setError(e instanceof Error ? e.message : "Something went wrong");
          }
        });
      }}
      id="invite-form"
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label="Name" required>
        <Input name="name" required minLength={2} />
      </Field>
      <Field label="Email" required>
        <Input name="email" type="email" required />
      </Field>
      <Field label="Role" required>
        <Select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as RoleValue)}
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label="College"
        required={role !== "SUPER_ADMIN"}
        hint={role === "SUPER_ADMIN" ? "Not applicable for super admins." : undefined}
      >
        <Select name="collegeId" disabled={role === "SUPER_ADMIN"}>
          <option value="">Select a college…</option>
          {colleges.map((c) => (
            <option key={c.id} value={c.id}>
              {c.shortName} — {c.name}
            </option>
          ))}
        </Select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Initial password" required hint="Share securely; user can change it later.">
          <Input name="password" type="text" required minLength={8} />
        </Field>
      </div>

      {error ? (
        <div className="sm:col-span-2">
          <Alert tone="error">{error}</Alert>
        </div>
      ) : null}
      {success ? (
        <div className="sm:col-span-2">
          <Alert tone="success">{success}</Alert>
        </div>
      ) : null}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Inviting…" : "Invite user"}
        </Button>
      </div>
    </form>
  );
}

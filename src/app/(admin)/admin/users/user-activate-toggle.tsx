"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setUserActiveAction } from "@/server/actions/users";

export function UserActivateToggle({
  userId,
  isActive,
}: {
  userId: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await setUserActiveAction(userId, !isActive);
          router.refresh();
        })
      }
      className="text-xs font-medium text-neutral-700 hover:underline disabled:text-neutral-400"
    >
      {isActive ? "Deactivate" : "Activate"}
    </button>
  );
}

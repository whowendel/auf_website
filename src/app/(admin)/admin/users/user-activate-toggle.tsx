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
      className="text-xs font-medium text-navy/70 transition-colors hover:text-navy hover:underline disabled:text-navy/30"
    >
      {isActive ? "Deactivate" : "Activate"}
    </button>
  );
}

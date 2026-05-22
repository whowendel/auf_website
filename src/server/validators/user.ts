import { z } from "zod";
import { Role } from "@prisma/client";

export const userInviteSchema = z
  .object({
    email: z.string().email().toLowerCase(),
    name: z.string().min(2).max(120),
    role: z.nativeEnum(Role),
    collegeId: z.string().nullable().optional(),
    password: z.string().min(8).max(200),
  })
  .superRefine((v, ctx) => {
    if (v.role !== Role.SUPER_ADMIN && !v.collegeId) {
      ctx.addIssue({
        code: "custom",
        path: ["collegeId"],
        message: "College is required for COLLEGE_* roles",
      });
    }
  });

export type UserInviteInput = z.infer<typeof userInviteSchema>;

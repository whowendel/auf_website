import { Role } from "@prisma/client";
import { requireAdminPage } from "@/server/auth/session";
import { activeColleges } from "@/data/colleges";
import { PageHeader, Card } from "@/components/ui/primitives";
import { PostForm } from "../post-form";

export const metadata = { title: "New post" };

export default async function NewPostPage() {
  const actor = await requireAdminPage();

  const colleges = activeColleges.map((c) => ({
    id: c.id,
    shortName: c.shortName,
    name: c.name,
  }));

  return (
    <>
      <PageHeader
        title="New post"
        description={
          actor.role === Role.SUPER_ADMIN
            ? "You can post university-wide or for any college."
            : "Drafts are saved here; submit for review when ready."
        }
      />
      <Card>
        <PostForm
          mode="create"
          role={actor.role}
          actorCollegeId={actor.collegeId}
          colleges={colleges}
        />
      </Card>
    </>
  );
}

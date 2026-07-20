import { Suspense } from "react";
import GroupExplorer from "@/components/groupExplorer";
import { PageHeader } from "@/components/page-header";

export default function GroupsPage() {
  return (
    <section className="relative min-h-screen bg-background py-14 text-foreground">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          label="Groups"
          title="Browse all groups"
          description="Every group in the Orlando Devs family. Members can join as many as they like — most groups meet monthly in person."
        />
        <Suspense
          fallback={
            <div className="py-10 text-center text-muted-foreground">
              Loading groups...
            </div>
          }
        >
          <GroupExplorer />
        </Suspense>
      </div>
    </section>
  );
}

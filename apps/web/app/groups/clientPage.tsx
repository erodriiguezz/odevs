"use client";

import GroupExplorer from "@/components/groupExplorer";
import { useIsMobile } from "@/hooks/isMobile";
import { useSearchParams } from "next/navigation";

export default function GroupsClientPage() {
  const isMobile = useIsMobile();
  const search = useSearchParams();

  const maxGroups = isMobile ? 6 : 12;

  return  <section className="bg-background py-[36]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
                  id="browse-groups-heading"
                  className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-foreground mb-5 font-display theme-trans"
                >
                  Browse All Groups
              </h2>
              <GroupExplorer maxGroups={maxGroups} overflowPages={{ page: (Number(search.get("page") ?? 1)) }} linkToGroupPage={true}></GroupExplorer>
            </div>
          </section>;
}
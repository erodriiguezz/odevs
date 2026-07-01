"use client";

import GroupExplorer from "@/components/groupExplorer";
import { useIsMobile } from "@/hooks/isMobile";

export default function GroupsClientPage({ search }: { search: { [key: string]: string | string[] | undefined }}) {
  const isMobile = useIsMobile();

  const maxGroups = isMobile ? 6 : 12;

  return  <section className="bg-white py-16 lg:py-28 border-b border-zinc-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
                  id="browse-groups-heading"
                  className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 mb-5"
                >
                  Browse Groups
              </h2>
              <GroupExplorer maxGroups={maxGroups} overflowPages={{ page: (Number(search["page"] ?? 1)) }} linkToGroupPage={true}></GroupExplorer>
            </div>
          </section>;
}
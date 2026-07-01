"use client";

import { Button } from "@/components/ui/button";
import GroupExplorer from "@/components/groupExplorer";
import { useIsMobile } from "@/hooks/isMobile";
import { useSearchParams } from "next/navigation";
import { ReadonlyURLSearchParams } from "next/navigation";

export default () => {
  const isMobile = useIsMobile();
  const search = new ReadonlyURLSearchParams(useSearchParams());

  return  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B4FE9] border-l-[3px] border-[#5B4FE9] pl-2.5 mb-5">
                  Explore Groups
                </p>
                <h2
                  id="explore-groups-heading"
                  className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-zinc-950"
                >
                  Find your corner of the community
                </h2>
                <p className="mt-3 text-base leading-relaxed text-zinc-500 max-w-lg">
                  Will show interest-based groups. Members can join multiple groups.
                </p>
              </div>
              <Button href={"/groups?" + search.toString()} className="shrink-0">
                Browse all groups
              </Button>
            </div>

            <GroupExplorer maxGroups={isMobile ? 6 : 12}></GroupExplorer>
          </div>
}
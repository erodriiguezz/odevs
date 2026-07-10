"use client";

import { Button } from "@/components/ui/button";
import GroupExplorer from "@/components/groupExplorer";
import { useIsMobile } from "@/hooks/isMobile";
import { useSearchParams } from "next/navigation";

export default () => {
  const isMobile = useIsMobile();
  const search = useSearchParams();
  
  return  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-l-[3px] border-primary pl-2.5 mb-5 font-mono theme-trans">
                  Explore Groups
                </p>
                <h2
                  id="explore-groups-heading"
                  className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-foreground font-display theme-trans"
                >
                  Find your corner of the community
                </h2>
              </div>
              <Button href={"/groups?" + search.toString()}>
                Browse all groups
              </Button>
            </div>

            <GroupExplorer maxGroups={isMobile ? 6 : 12}></GroupExplorer>
          </div>;
}
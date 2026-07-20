import Link from "next/link";
import type { CommunityGroup } from "@/lib/types/group";
import { Icon } from "@/components/icons/icon";
import Logo from "@/components/logo";
import { getGroupBrandColor } from "@/lib/group-brand-color";

export function GroupsGrid({ groups }: { groups: CommunityGroup[] }) {
  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Logo sad={true} className="my-5 h-36 w-36" />
        <p className="text-xl font-bold text-muted-foreground">
          No results found!
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
    >
      {groups.map((group) => {
        const brandColor = getGroupBrandColor(group);

        return (
          <Link
            key={group.id}
            href={group.eventSources[0].url}
            target="_blank"
            rel="noreferrer"
            className="card-elev group relative flex h-full flex-col gap-4 rounded-2xl p-5 transition-all hover:scale-[1.02]"
            role="listitem"
            aria-label={`Group ${group.name}`}
          >
            <div className="flex items-start justify-between">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow"
                style={{ backgroundColor: brandColor }}
              >
                <Icon className="h-5 w-5" icon={group.icon} width={2.2} />
              </span>
              <span className="rounded-full border border-border/70 bg-surface/60 px-2.5 py-0.5 text-xs text-muted-foreground">
                {group.category.name}
              </span>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">
                {group.name}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {group.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Groups } from '@/lib/data/groups';
import { GroupCategoryNames, GroupCategoryType, isGroupCategory } from '@/lib/data/groupCategories';
import { FilterBar, filterIfAny } from './ui/filter-bar';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Icon } from './icons/icon';
import Logo from './logo';

export default ({ maxGroups, overflowPages, linkToGroupPage=false }: { maxGroups: number, overflowPages?: { page: number }, linkToGroupPage?: boolean }) => {
  const params = new URLSearchParams(useSearchParams());
  const { replace } = useRouter();
  const pathname = usePathname();

  const categories = new Set<GroupCategoryType>(params.getAll("categories").filter(isGroupCategory));

  const search = params.get("search") ?? "";

  let selectedGroups = filterIfAny(Object.values(Groups), group => group.category.name, categories);

  const searchWords = search.toLowerCase().split(" ");
  if (search != "") selectedGroups = selectedGroups.filter((group) => searchWords.every(word => group.name.toLowerCase().includes(word))
      || searchWords.every(word => group.topic.toLowerCase().includes(word))
      || searchWords.every(word => group.description.toLowerCase().includes(word))
      || group.eventSources.some(source => searchWords.every(word => source.description !== undefined ? source.description.toLowerCase().includes(word) : false)));

  
  const pageGroups = selectedGroups.filter((_, i) => i < (overflowPages !== undefined ? overflowPages.page-1 : 0)*maxGroups + maxGroups && i > ((overflowPages !== undefined ? overflowPages.page : 0)-1)*maxGroups-1);

  const numPages = Math.ceil(selectedGroups.length/maxGroups);

  useEffect(() => {
    if (overflowPages !== undefined && (overflowPages.page > numPages || overflowPages.page < 1)) {
      params.set("page", Math.max(Math.min(overflowPages.page, numPages), 1).toString());
      replace(pathname + "?" + params.toString());
    }
  }, [overflowPages?.page, numPages, pathname]);

  const changeQueryString = (name: string, value: string) => {
    params.set(name, value);
    return params.toString();
  };

  return  <div className="flex flex-col gap-5 items-center">
            <div className="text-zinc-600 dark:text-zinc-400 flex flex-row gap-2 items-center border border-border focus-within:border-border-glow w-full rounded-full px-2 bg-surface/60 theme-trans">
              <Icon icon="magnifying-glass" className="w-5 h-5 ml-2 theme-trans "/>
              <input value={search} onChange={
                  event => {
                    params.set("search", event.target.value);
                    if (overflowPages !== undefined) params.set("page", "1"); 
                    replace(pathname + "?" + params.toString(), { scroll: false });
                  }
              } className="w-full py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none theme-trans" placeholder="Search Groups"/>
            </div>

            <FilterBar selectedValues={categories} values={GroupCategoryNames} paramName="categories"/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" role="list">
            {pageGroups.map(({ name, icon, category, description, eventSources, websiteUrl, background, id }, i) => (
              <Link
                key={i}
                href={linkToGroupPage ? `/groups/${id}` : (websiteUrl ?? eventSources[0].url)}
                target="_blank"
                className="border border-border-glow rounded-xl p-5 flex flex-col gap-3.5 hover:scale-105 hover:border-muted-foreground bg-surface/70 theme-trans"
                role="listitem"
                aria-label={`Group ${name}`}
              >
                <div className="flex justify-between mb-1.5">
                  <Icon className={`h-12 w-12 h-full-auto rounded-2xl p-3 text-white ${background}`} icon={icon}></Icon>
                  <div className="flex flex-col items-center">
                    <span className={`bg-primary px-2 py-1 font-semibold rounded-full flex m-auto text-xs text-white font-mono`}>{category.name}</span>
                  </div>
                </div>
                <p className="font-semibold text-lg text-zinc-600 dark:text-zinc-300 font-display theme-trans" >{name}</p>
                <p className="text-s text-muted-foreground my-auto self-center theme-trans" >{description}</p>
              </Link>
            ))}
            </div>

            {pageGroups.length == 0 &&
              <div className="flex flex-col justify-center items-center">
                <Logo sad={true} className="w-36 h-36 mb-5"/>
                <p className="text-zinc-700 dark:text-zinc-300 text-xl font-bold theme-trans">No results found!</p>
              </div>
            }

            {overflowPages !== undefined && pageGroups.length != 0 &&
              <div className="flex flex-row items-center gap-2">
                <Link
                  href={(overflowPages !== undefined && (overflowPages.page-1 < 1) ? "#" : (pathname ?? "/")  + "?" + changeQueryString("page", (overflowPages.page-1).toString()))}
                  className={"transition-all duration-500 hover:scale-120 " + ((overflowPages.page-1 < 1) ? "pointer-events-none opacity-50" : "")}
                  tabIndex={(overflowPages.page-1 < 1) ? -1 : 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white theme-trans" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="28.5" y1="18" x2="7.5" y2="18"></line>
                    <polyline points="18 28.5 7.5 18 18 7.5"></polyline>
                  </svg>
                </Link>
                
                {Array.from({length: numPages}, (_, i) => i+1).map(i =>
                  <div key={i}>
                    <Link
                      href={(pathname ?? "/") + `?page=${i}`}
                      className={"group rounded-full w-8 h-8 flex justify-center items-center text-2xl transition-all duration-500 " 
                        + (i == overflowPages.page ? "hover:scale-110" : "hover:scale-120")}
                    >
                      <span className={"group-hover:text-foreground theme-trans " + (i == overflowPages.page ? "text-zinc-800 dark:text-zinc-200" : "text-light-foreground")}>{i}</span>
                    </Link>
                  </div>
                )}

                <Link
                  href={(overflowPages !== undefined && (overflowPages.page+1 > numPages) ? "#" : (pathname ?? "/")  + "?" + changeQueryString("page", (overflowPages.page+1).toString()))}
                  className={"transition-all duration-500 hover:scale-120 " + ((overflowPages.page+1 > numPages) ? "pointer-events-none opacity-50" : "")}
                  tabIndex={(overflowPages.page+1 > numPages) ? -1 : 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-foreground theme-trans" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="28.5" y1="18" x2="7.5" y2="18"></line>
                    <polyline points="18 28.5 28.5 18 18 7.5"></polyline>
                  </svg>
                </Link>
              </div>
            }
          </div>;
};
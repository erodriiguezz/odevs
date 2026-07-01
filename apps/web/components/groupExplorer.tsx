import { useState, useEffect } from 'react';
import groups from '@/lib/data/groups';
import groupCategories from '@/lib/data/groupCategories';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default ({ maxGroups, overflowPages, linkToGroupPage=false }: { maxGroups: number, overflowPages?: { page: number }, linkToGroupPage?: boolean }) => {
  const params = new URLSearchParams(useSearchParams());
  const { replace } = useRouter();
  const pathname = usePathname();

  const [category, setSelectedCategory] = useState(params.get("category") ?? "any");
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [sizeRangeLower, setSelectedSizeRangeLower] = useState(params.get("lowerSizeRange") ?? "");
  const [sizeRangeUpper, setSelectedSizeRangeUpper] = useState(params.get("upperSizeRange") ?? "");

  const handleChange = <T,>(param: string, set: ((newVal: string) => void)) =>
    (event: React.ChangeEvent<T> & {target: {value: string}}) => {
      const val: string = event.target.value;
      set(val);

      params.set(param, val);
      if (overflowPages !== undefined) params.set("page", "1");
      replace(pathname + "?" + params.toString() + (pathname == "/" && "#explore-groups"));
    };

  function isIntegerString(val: string): val is `${number}` {
    const trimmed = val.trim();
    if (trimmed === "") return false;

    const num = Number(trimmed);
    return !Number.isNaN(num) && Number.isFinite(num) && Number.isInteger(num);
  }

  let selectedGroups = Object.values(groups);
  if (category != "any") selectedGroups = selectedGroups.filter((group) => (category == "any" ? true : group.category.name == category));

  const searchWords = search.toLowerCase().split(" ");
  if (search != "") selectedGroups = selectedGroups.filter((group) => searchWords.every(word => group.name.toLowerCase().includes(word))
      || searchWords.every(word => group.topic.toLowerCase().includes(word))
      || searchWords.every(word => group.description.toLowerCase().includes(word))
      || group.eventSources.some(source => searchWords.every(word => source.description !== undefined ? source.description.toLowerCase().includes(word) : false)));

  if (isIntegerString(sizeRangeLower)) selectedGroups = selectedGroups.filter((group) => (group.eventSources[0].members ?? 0) >= Number(sizeRangeLower));
  if (isIntegerString(sizeRangeUpper)) selectedGroups = selectedGroups.filter((group) => (group.eventSources[0].members ?? 0) <= Number(sizeRangeUpper));

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

  return  <>
            <div className="text-zinc-600 flex flex-row flex-wrap gap-10 mb-4">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="category" className="whitespace-nowrap">Filter by category:&nbsp;</label>
                <select value={category} onChange={handleChange("category", setSelectedCategory)} className="border border-zinc-300 rounded-lg p-1">
                  <option value="any">Any</option>
                  {Object.values(groupCategories).map(({ name }, i) =>
                    <option value={name} key={i}>{name}</option>
                  )}
                </select>
              </div>

              <div className="flex flex-row items-center gap-2 flex-1">
                <label htmlFor="search" className="whitespace-nowrap">Search:&nbsp;</label>
                <input value={search} onChange={handleChange("search", setSearch)} className="border border-zinc-300 rounded-lg p-1 w-10 grow"></input>
              </div>

              <div className="flex items-center gap-2 flex-1">
                <label htmlFor="sizeRange" className="whitespace-nowrap">Filter by size range:</label>
                <input value={sizeRangeLower} onChange={handleChange("lowerSizeRange", setSelectedSizeRangeLower)}
                    className="border border-zinc-300 rounded-lg p-1 w-10 grow">
                </input>
                <span>-</span>
                <input value={sizeRangeUpper} onChange={handleChange("upperSizeRange", setSelectedSizeRangeUpper)}
                    className="border border-zinc-300 rounded-lg p-1 w-10 grow">
                </input>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" role="list">
            {pageGroups.map(({ name, icon, category, description, eventSources, websiteUrl, background, id }, i) => (
              <Link
                key={i}
                href={linkToGroupPage ? `/groups/${id}` : (websiteUrl ?? eventSources[0].url)}
                target="_blank"
                className="border border-zinc-200 rounded-xl p-5 flex flex-col gap-3.5 transition-all duration-200 hover:scale-105 hover:border-zinc-400"
                role="listitem"
                aria-label={`Group ${name}`}
              >
                <div className="flex justify-between mb-1.5">
                  <Image className={`w-full-auto h-full-auto rounded-xl p-3 ${background}`} src={icon} alt={icon.substring(icon.lastIndexOf("/"))} width={50} height={50}/>
                  <div className="flex flex-col items-center">
                    <span className={`border ${category.background} px-2 py-1 font-semibold rounded-full flex m-auto text-xs text-white`}>{category.name}</span>
                  </div>
                </div>
                <p className="font-semibold text-lg text-zinc-600" >{name}</p>
                <p className="text-s text-zinc-500" >{description}</p>
              </Link>
            ))}
            </div>

            {pageGroups.length == 0 &&
              <div className="flex flex-row justify-center">
                <p className="text-zinc-700 text-xl font-bold">No results found!</p>
              </div>
            }

            {overflowPages !== undefined && pageGroups.length != 0 &&
              <div className="flex flex-row justify-center items-center gap-2 mt-10">
                <Link
                  href={(pathname ?? "/") + "?" + changeQueryString("page", (overflowPages.page-1).toString())}
                  className={"transition-all duration-500 hover:scale-120 " + ((overflowPages.page-1 < 1) ? "pointer-events-none opacity-50" : "")}
                  tabIndex={(overflowPages.page-1 < 1) ? -1 : 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <span className={"transition-colors group-hover:text-zinc-900 " + (i == overflowPages.page ? "text-zinc-800" : "text-zinc-400")}>{i}</span>
                    </Link>
                  </div>
                )}

                <Link
                  href={(pathname ?? "/")  + "?" + changeQueryString("page", (overflowPages.page+1).toString())}
                  className={"transition-all duration-500 hover:scale-120 " + ((overflowPages.page+1 > numPages) ? "pointer-events-none opacity-50" : "")}
                  tabIndex={(overflowPages.page+1 > numPages) ? -1 : 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="28.5" y1="18" x2="7.5" y2="18"></line>
                    <polyline points="18 28.5 28.5 18 18 7.5"></polyline>
                  </svg>
                </Link>
              </div>
            }
          </>;
};
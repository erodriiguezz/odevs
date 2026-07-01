import { notFound } from 'next/navigation';
import groups from '@/lib/data/groups';
import Image from 'next/image';
import Link from 'next/link';
import { platforms } from '@/lib/types/platform';

export default async function GroupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const group = groups[slug];
  if (group === undefined) notFound();
  
  return  <div className="flex flex-row justify-center min-h-screen items-center mt-[-6rem] mb-[-10rem]">
            <div className="flex flex-col items-center gap-5 max-w-7xl">
              <div className="flex flex-row items-center gap-10">
                {group.logo && <Image src={group.logo} width={48} height={48} alt={group.name + " logo"}></Image>}
                <h2 className="text-4xl">
                  {group.name}
                </h2>
                <span>{group.description}</span>
                <span className="font-semibold">Topic: {group.topic}</span>
              </div>
              {group.longDescription && <p>{group.longDescription}</p>}
              {group.eventSources.map((source, i) => 
                <div key={i} className="flex flex-col items-center gap-2">
                  <Link href={source.url} className="flex flex-row items-center gap-1" target="_blank">
                    {platforms[source.platform].logo !== undefined && <img src={platforms[source.platform].logo?.path} className="max-h-10"></img>}
                    {(platforms[source.platform].logo === undefined || !(platforms[source.platform].logo?.containsName)) && source.platform.replace(/./, (c) => c.toUpperCase())}
                    <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    {source.title && <span className="ml-5">{source.title}</span>}
                    {source.members && <span className="ml-5">{source.members} members</span>}
                  </Link>
                  {source.image && <img src={source.image} alt={source.platform + " image"} className="max-w-100 border-5 border-zinc-100 rounded-xl"/>}
                  {source.description && <p className="whitespace-pre-line">{source.description}</p>}
                </div>
              )}
            </div>
          </div>;
}
import { notFound } from 'next/navigation';
import groups from '@/lib/data/groups';
import Image from 'next/image';
import Link from 'next/link';
import { platforms } from '@/lib/data/platforms';

export default async function GroupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const group = groups[slug];
  if (!group) notFound();

  return (
    <div className="min-h-screen bg-background text-zinc-50 py-16 px-4 flex items-center justify-center theme-trans">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-row items-center gap-6 rounded-xl p-3">
          {group.logo && (
            <div className={`relative w-19 h-19 shrink-0 rounded-xl overflow-hidden flex items-center justify-center ${group.category.darkBackground} p-2`}>
              <Image src={group.logo} width={64} height={64} alt={`${group.name} logo`} className="object-contain"/>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-center sm:text-left text-foreground">
              {group.name}
            </h1>
            <div className="flex flex-col items-center">
              <span className={`bg-primary px-2 py-1 font-semibold rounded-full flex m-auto text-xs text-white font-mono`}>{group.category.name}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
          <span className="text-muted-foreground theme-trans">{group.description}</span>
          <span className="inline-block w-1 h-1 rounded-full bg-border-glow theme-trans" aria-hidden="true" />
          <span className="font-medium text-medium-foreground theme-trans">
            Topic: <span className="text-foreground theme-trans">{group.topic}</span>
          </span>
        </div>

        {group.longDescription && (
          <div className="w-full max-w-2xl flex flex-col items-center gap-4 text-center">
            <hr className="border-border w-1/2 theme-trans" />
            <p className="text-medium-foreground leading-relaxed text-sm md:text-base theme-trans">
              {group.longDescription}
            </p>
          </div>
        )}

        <div className="w-full max-w-2xl flex flex-col gap-4 mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-1 theme-trans">
            Where to find our events
          </h2>
          
          {group.eventSources.map((source, i) => 
              <div 
                key={i} 
                className="flex flex-col gap-4 border border-border p-5 rounded-2xl bg-muted-background/50 backdrop-blur-sm hover:border-border-glow theme-trans"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  
                  <Link 
                    href={source.url} 
                    className="flex items-center gap-2 font-medium group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platforms[source.platform].logo !== undefined && platforms[source.platform].logo?.image?.src && (
                      <div className="relative h-6 w-auto min-w-[24px] flex items-center">
                        <img
                          src={platforms[source.platform].logo?.image.src}
                          alt={`${source.platform} logo`}
                          className="h-6 w-auto object-contain brightness-90 group-hover:brightness-100 theme-trans"
                        />
                      </div>
                    )}
                    
                    {(!platforms[source.platform]?.logo !== undefined || !platforms[source.platform].logo?.containsName) && (
                      <span className="capitalize text-soft-foreground group-hover:text-foreground theme-trans">{source.platform}</span>
                    )}

                    <svg  xmlns="http://www.w3.org/2000/svg" width="14" height="14"  viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 theme-trans">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </Link>

                  <div className="flex items-center gap-3 text-xs md:text-sm">
                    {source.title && (
                      <span className="bg-border/60 px-2.5 py-1 rounded-md max-w-[200px] truncate text-muted-foreground theme-trans">
                        {source.title}
                      </span>
                    )}
                    {source.members && (
                      <span className="bg-border/60 px-2.5 py-1 rounded-md font-mono text-medium-foreground theme-trans">
                        {source.members.toLocaleString()} members
                      </span>
                    )}
                  </div>
                </div>

                {source.description && (
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed border-l-2 border-border pl-3 theme-trans">
                    {source.description}
                  </p>
                )}

                {source.image && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-border bg-zinc-950 aspect-video w-full theme-trans">
                    <img src={source.image} alt={`${source.platform} cover`}  className="w-full h-full object-cover"/>
                  </div>
                )}
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
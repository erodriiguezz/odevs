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
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Header Hero Area */}
        <div className={`w-full flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl border border-zinc-800 bg-gradient-to-br ${group.category.darkBackground || 'from-zinc-900 to-zinc-800'}`}>
          {group.logo && (
            <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-zinc-900/50 p-2 border border-zinc-700/30 flex items-center justify-center">
              <Image 
                src={group.logo} 
                width={64} 
                height={64} 
                alt={`${group.name} logo`}
                className="object-contain"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-center sm:text-left">
            {group.name}
          </h1>
        </div>

        {/* Quick Meta Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base text-zinc-400">
          <span>{group.description}</span>
          <span className="inline-block w-1 h-1 rounded-full bg-zinc-700" aria-hidden="true" />
          <span className="font-medium text-zinc-300">
            Topic: <span className="text-zinc-100">{group.topic}</span>
          </span>
        </div>

        {/* Long Description Section */}
        {group.longDescription && (
          <div className="w-full max-w-2xl flex flex-col items-center gap-4 text-center">
            <hr className="border-zinc-800 w-1/2" />
            <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
              {group.longDescription}
            </p>
          </div>
        )}

        {/* Event Sources Grid */}
        <div className="w-full max-w-2xl flex flex-col gap-4 mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 text-center mb-1">
            Where to find our events
          </h2>
          
          {group.eventSources.map((source, i) => {
            const platformInfo = platforms[source.platform];
            const hasLogo = platformInfo?.logo !== undefined;
            
            return (
              <div 
                key={i} 
                className="flex flex-col gap-4 border border-zinc-800 p-5 rounded-2xl bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-700 transition-colors duration-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  
                  {/* Platform Link */}
                  <Link 
                    href={source.url} 
                    className="flex items-center gap-2 text-zinc-200 hover:text-white font-medium group/link transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hasLogo && platformInfo.logo?.image?.src && (
                      <div className="relative h-6 w-auto min-w-[24px] flex items-center">
                        <img
                          src={platformInfo.logo.image.src}
                          alt={`${source.platform} logo`}
                          className="h-6 w-auto object-contain brightness-90 group-hover/link:brightness-100 transition-all"
                        />
                      </div>
                    )}
                    
                    {(!hasLogo || !platformInfo.logo?.containsName) && (
                      <span className="capitalize">{source.platform}</span>
                    )}

                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="shrink-0 text-zinc-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </Link>

                  {/* Metadata tags */}
                  <div className="flex items-center gap-3 text-xs md:text-sm text-zinc-400">
                    {source.title && (
                      <span className="bg-zinc-800/60 px-2.5 py-1 rounded-md max-w-[200px] truncate">
                        {source.title}
                      </span>
                    )}
                    {source.members && (
                      <span className="bg-zinc-800/60 px-2.5 py-1 rounded-md font-mono text-zinc-300">
                        {source.members.toLocaleString()} members
                      </span>
                    )}
                  </div>
                </div>

                {/* Optional Source Description */}
                {source.description && (
                  <p className="text-sm text-zinc-400 whitespace-pre-line leading-relaxed border-l-2 border-zinc-800 pl-3">
                    {source.description}
                  </p>
                )}

                {/* Optional Source Image */}
                {source.image && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-video w-full">
                    <img 
                      src={source.image} 
                      alt={`${source.platform} cover`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
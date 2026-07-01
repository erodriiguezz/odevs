"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import sponsors from '@/lib/data/sponsors';
import GroupsSection from './groupsSection';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="bg-zinc-950 text-white py-16 lg:py-28 overflow-hidden relative"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(91,79,233,0.22) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                id="hero-heading"
                className="text-4xl lg:text-7xl font-extrabold leading-tight tracking-tight"
              >
                Welcome to <em className="not-italic text-[#5B4FE9]">ODevs</em>
              </h1>

              <p className="mt-5 text-base lg:text-lg leading-relaxed text-zinc-400 max-w-md">
                Embark on a journey within a close-knit community sculpted by the talent of Orlando
                and Central Florida's developers.
              </p>

              <div className="flex gap-3.5 mt-9 flex-wrap">
                <Button href="#">Join the community</Button>
                <Button variant="secondary" href="/calendar">
                  Explore events
                </Button>
              </div>

              <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
                {[
                  { value: '—', label: 'Active members' },
                  { value: '—', label: 'Groups' },
                  { value: '—', label: 'Events this month' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-3xl font-extrabold tracking-tight">{s.value}</div>
                    <div className="text-xs text-zinc-500 mt-0.5 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-4" aria-hidden="true">
              {[75, 55, 65].map((w, i) => (
                <div
                  className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4"
                  key={i}
                >
                  <div className="w-11 h-11 rounded-md bg-[#5B4FE9]/25 shrink-0" />
                  <div className="flex-1">
                    <div className="h-2.5 rounded bg-white/10 mb-2" style={{ width: `${w}%` }} />
                    <div className="h-2.5 rounded bg-white/10" style={{ width: '45%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coming Up  */}
      <section
        id="coming-up"
        aria-labelledby="coming-up-heading"
        className="bg-white py-16 lg:py-28 border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B4FE9] border-l-[3px] border-[#5B4FE9] pl-2.5 mb-5">
                Coming Up
              </p>
              <h2
                id="coming-up-heading"
                className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-zinc-950"
              >
                Events you won't want to miss
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-500 max-w-lg">
                Placeholder — will surface upcoming events sorted by date, filtered to the viewer's
                interests and location.
              </p>
            </div>
            <Button href="/calendar" className="shrink-0">
              View all events
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {['Workshop', 'Meetup', 'Conference'].map((type, i) => (
              <article
                key={i}
                className="border border-zinc-200 rounded-xl overflow-hidden"
                role="listitem"
                aria-label={`${type} event placeholder`}
              >
                <div className="h-40 bg-zinc-100" aria-hidden="true" />
                <div className="p-5">
                  <div className="mb-3">
                    <span className="inline-block bg-[#EAE8FD] text-[#5B4FE9] rounded px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide">
                      {type}
                    </span>
                  </div>
                  <div className="h-3.5 rounded bg-zinc-100 mb-2.5" style={{ width: '85%' }} />
                  <div className="h-3.5 rounded bg-zinc-100 mb-2.5" style={{ width: '60%' }} />
                  <div className="h-3.5 rounded bg-zinc-100 w-[60%] mt-3" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-heading" className="bg-zinc-50 py-16 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B4FE9] border-l-[3px] border-[#5B4FE9] pl-2.5 mb-5">
                About Our Community
              </p>
              <h2
                id="about-heading"
                className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-zinc-950"
              >
                Built by the community,
                <br />
                for the community
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-500 max-w-lg">
                Placeholder — will tell the founding story, the community's purpose, and what makes
                it different. Authentic voice, no marketing speak.
              </p>

              <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
                {['Open by default', 'Skill sharing', 'Inclusive spaces', 'Local roots'].map(v => (
                  <div
                    className="bg-white border border-zinc-200 rounded-xl p-5"
                    key={v}
                    role="listitem"
                  >
                    <div className="w-9 h-9 rounded-md bg-[#EAE8FD] mb-3" aria-hidden="true" />
                    <div className="h-3 rounded bg-zinc-100 w-[70%] mb-2" />
                    <div className="h-2.5 rounded bg-zinc-100" />
                  </div>
                ))}
              </div>
            </div>

            <div className="h-60 lg:h-96 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 text-sm font-semibold order-first lg:order-none">
              Community photo / illustration
            </div>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section
        id="explore-groups"
        aria-labelledby="explore-groups-heading"
        className="bg-white py-16 lg:py-28 border-b border-zinc-200"
      >
        <GroupsSection></GroupsSection>
      </section>

      {/* Sponsors */}
      <section
        id="sponsors"
        aria-labelledby="sponsors-heading"
        className="bg-zinc-50 py-12 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B4FE9] mb-5">
              Sponsors
            </p>
            <h2
              id="sponsors-heading"
              className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 text-center"
            >
              Thank you to our community sponsors!
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex flex-wrap justify-center items-center">
            {Object.values(sponsors).map(({ url, logo, name }, i) => (
              <Link
                key={i}
                href={url}
                target="_blank"
                className="border border-zinc-200 rounded-lg bg-white flex items-center justify-center text-zinc-400 text-xs font-semibold w-full h-full p-4 transition-all duration-200 hover:scale-105 hover:border-zinc-400"
              >
                <Image src={logo} alt={name + " logo"} width={240} height={96} className="max-w-full max-h-full object-contain"/>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 pt-10 border-t border-zinc-200">
            <p className="text-zinc-500 text-sm mb-4">Interested in supporting the community?</p>
            <Button href="https://discord.gg/v6gchdH43K" target="_blank">Become a sponsor</Button>
          </div>
        </div>
      </section>
    </>
  )
}

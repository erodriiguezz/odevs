"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import sponsors from '@/lib/data/sponsors';
import GroupsSection from './_components/groupsSection';
import { events } from '@/lib/data/events';
import { ArrowUpRightIcon } from '@/components/icons';
import groups from '@/lib/data/groups';

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1
            id="hero-heading-1"
            className="text-4xl lg:text-7xl font-semibold leading-tight tracking-tight text-center font-display"
          >
            <span className="font-extrabold">Welcome to <em className="not-italic text-[#5B4FE9]">ODevs</em></span>
          </h1>
          <h1
            id="hero-heading-2"
            className="text-4xl lg:text-7xl font-semibold leading-tight tracking-tight text-center font-display text-balance"
          >
            The developer community that <em className="not-italic text-[#5B4FE9]">meets in person</em>.
          </h1>

          <p className="mt-5 text-base lg:text-lg leading-relaxed text-zinc-400 max-w-5xl">
            Embark on a journey within a close-knit community sculpted by the talent of Orlando
            and Central Florida's developers.
            <br></br>
            Orlando Devs is a 501(c)(3) nonprofit connecting engineers, designers, and tech folks across Central Florida.
          </p>

          <div className="flex gap-3.5 mt-9 flex-wrap">
            <Link href="https://discord.gg/v6gchdH43K" target="_blank" className="inline-flex gap-2 items-center rounded-full bg-primary transition-all duration-300 hover:-translate-y-px text-white px-7 py-3.5">
              Join the Discord
              <ArrowUpRightIcon></ArrowUpRightIcon>
            </Link>
            <Link href="/calendar" className="inline-flex gap-2 items-center bg-transparent text-zinc-400 rounded-full border border-zinc-600 hover:text-white hover:border-zinc-400 px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-px">
              Explore events
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
            </Link>
          </div>

          <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { value: groups['orlando-devs'].eventSources[0].members, label: 'Active members' }, // change this in the future
              { value: Object.keys(groups).length, label: 'Groups' },
              { value: events.filter(event => new Date(event.date).getMonth() == new Date(Date.now()).getMonth()).length, label: 'Events this month' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold tracking-tight">{s.value}</div>
                <div className="text-xs text-zinc-500 mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
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
                Events featured by the community. Will be filtered to the viewer's interests and location.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:grid-cols-2 gap-10 lg:gap-15 items-center">
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

            <div className="items-center mt-9">
              <h3 className="text-2xl font-semibold mb-6 text-[#5B4FE9]">
                Our Mission
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-zinc-500">
                Orlando Devs is a vibrant community of software developers, designers, and tech enthusiasts in the Orlando and Central Florida area. We're dedicated to fostering growth, collaboration, and knowledge sharing among our members.
              </p>
              <p className="text-gray-300 leading-relaxed text-zinc-500">
                Whether you're a seasoned professional or just starting your journey in tech, our community provides a supportive environment where you can learn, network, and contribute to the local tech ecosystem.
              </p>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-[#5B4FE9] mt-12">
              What We Offer
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" role="list">
              {[{ title: 'Open by Default', desc: 'You don\'t have to sign up to come enjoy' },
                { title: 'Skill Sharing', desc: 'Meet the experienced, gain experience, share knowledge' },
                { title: 'Inclusive Spaces', desc: 'Our community is open to anyone and everyone' },
                { title: 'Local Roots', desc: 'Grassroots organization by enthusiastic Orlando locals' },
                { title: 'Teaching', desc: 'Mentorship programs for developers at all levels' },
                { title: 'Work', desc: 'Job opportunities and career guidance' },
                { title: 'Engage', desc: 'Active Discord community for daily discussions' },
                { title: 'Learn', desc: 'Technical workshops and learning sessions' },
                { title: 'Events', desc: 'Regular meetups and networking events' },].map(v => (
                <div
                  className="bg-white border border-zinc-200 rounded-xl p-5"
                  key={v.title}
                  role="listitem"
                >
                  <div className="flex h-9 rounded-md bg-[#EAE8FD] mb-3 items-center justify-center">
                    <p className="text-zinc-600 whitespace-nowrap font-bold">{v.title}</p>
                  </div>
                  <p className="text-zinc-500 text-[15px]">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:max-w-100 rounded-xl flex items-center justify-center order-first lg:order-none relative overflow-hidden rounded-2xl aspect-[16/9] lg:aspect-[2/3]">
            <Image src="/images/groups/images/orlando-devs-meetup.avif" alt="Orlando devs meetup" fill className="object-cover"/>
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
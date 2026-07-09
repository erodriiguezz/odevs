"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import sponsors from '@/lib/data/sponsors';
import GroupsSection from './_components/groupsSection';
import { ArrowUpRightIcon } from '@/components/icons';
import { EventCard } from '@/components/ui/event-card';
import { events } from '@/lib/data/events';
import groups from '@/lib/data/groups';
import Logo from '@/components/logo';

export default function HomePage() {
  const upcomingEvents = events.filter(event => new Date(event.date).getTime() > Date.now())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
  
  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="bg-background text-foreground py-16 lg:py-28 overflow-hidden relative theme-trans"
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
            <span className="font-extrabold">Welcome to <em className="not-italic text-primary theme-trans">ODevs</em></span>
          </h1>
          <h1
            id="hero-heading-2"
            className="text-4xl lg:text-7xl font-semibold leading-tight tracking-tight text-center font-display text-balance"
          >
            The developer community that <em className="not-italic text-primary">meets in person</em>.
          </h1>

          <p className="mt-5 text-base lg:text-lg leading-relaxed text-muted-foreground max-w-5xl">
            Embark on a journey within a close-knit community sculpted by the talent of Orlando
            and Central Florida's developers.
            <br></br>
            Orlando Devs is a 501(c)(3) nonprofit connecting engineers, designers, and tech folks across Central Florida.
          </p>

          <div className="flex gap-3.5 mt-9 flex-wrap">
            <Button href="https://discord.gg/v6gchdH43K" target="_blank" flex={true}>
              Join the Discord
              <ArrowUpRightIcon className="w-5 h-5"></ArrowUpRightIcon>
            </Button>
            <Button variant="secondary" href="/calendar" flex={true}>
              Explore events
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect width="18" height="18" x="3" y="4" rx="2"/>
                <path d="M3 10h18"/>
              </svg>
            </Button>
          </div>

          <div className="flex gap-16 mt-12 pt-8 border-t border-foreground/10 theme-trans">
            {[
              { value: groups['orlando-devs'].eventSources[0].members, label: 'Members' }, // change this in the future
              { value: Object.keys(groups).length, label: 'Groups' },
              { value: events.filter(event => new Date(event.date).getMonth() == new Date(Date.now()).getMonth()).length, label: 'Events this month' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold tracking-tight text-foreground theme-trans">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-0.5 theme-trans">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Up  */}
      <section
        id="coming-up"
        aria-labelledby="coming-up-heading"
        className="bg-background py-16 lg:py-28 border-b border-separator theme-trans"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-l-[3px] border-primary pl-2.5 mb-5">
                Coming Up
              </p>
              <h2
                id="coming-up-heading"
                className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-foreground theme-trans"
              >
                Events you won't want to miss
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground max-w-lg theme-trans">
                Events featured by the community. Will be filtered to the viewer's interests and location.
              </p>
            </div>
            <Button href="/calendar" className="shrink-0">
              View all events
            </Button>
          </div>

          {upcomingEvents.length < 1 ?
            <div className="flex flex-col items-center gap-5">
              <Logo sad={true} className="aspect-ratio-square bg-foreground rounded-xl border-5 border-foreground theme-trans w-36 h-36 text-background theme-trans"/>
              <p className="text-muted-foreground font-bold text-xl theme-trans">Check back later for future events!</p>
            </div> 
          : 
            <div className="flex flex-row flex-wrap justify-center gap-6" role="list">
              {upcomingEvents.map(event => (
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 grid" key={event.id}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          }
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-heading" className="bg-background py-16 lg:py-28 theme-trans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:grid-cols-2 gap-10 lg:gap-15 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-l-[3px] border-primary pl-2.5 mb-5">
              About Our Community
            </p>
            <h2
              id="about-heading"
              className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-foregroun theme-trans"
            >
              Built by the community,
              <br />
              for the community
            </h2>

            <div className="items-center mt-9">
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Our Mission
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground theme-trans">
                Orlando Devs is a vibrant community of software developers, designers, and tech enthusiasts in the Orlando and Central Florida area. We're dedicated to fostering growth, collaboration, and knowledge sharing among our members.
              </p>
              <p className="leading-relaxed text-muted-foreground theme-trans">
                Whether you're a seasoned professional or just starting your journey in tech, our community provides a supportive environment where you can learn, network, and contribute to the local tech ecosystem.
              </p>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-primary mt-12">
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
                  className="bg-surface border border-separator rounded-xl p-5 theme-trans"
                  key={v.title}
                  role="listitem"
                >
                  <div className="flex h-9 rounded-md bg-primary-muted mb-3 items-center justify-center theme-trans">
                    <p className="text-foreground-soft whitespace-nowrap font-bold">{v.title}</p>
                  </div>
                  <p className="text-muted-foreground text-[15px] theme-trans">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:max-w-100 rounded-xl flex items-center justify-center order-first lg:order-none relative overflow-hidden rounded-2xl aspect-[16/9] lg:aspect-[2/3]">
            <Image src="/images/OTAB_PHOTO.jpg" alt="Orlando devs meetup" fill className="object-cover"/>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section
        id="explore-groups"
        aria-labelledby="explore-groups-heading"
        className="bg-background py-16 lg:py-28 border-b border-separator theme-trans"
      >
        <GroupsSection></GroupsSection>
      </section>

      {/* Sponsors */}
      <section
        id="sponsors"
        aria-labelledby="sponsors-heading"
        className="bg-background py-12 lg:py-20 theme-trans"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-5">
              Sponsors
            </p>
            <h2
              id="sponsors-heading"
              className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-foreground text-center theme-trans"
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
                className="border border-zinc-200 hover:border-zinc-400 rounded-xl bg-white dark:bg-zinc-200 flex items-center justify-center w-full h-full p-4 hover:scale-105 dark:hover:drop-shadow-[0_0px_10px_rgba(255,255,255,0.7)] theme-trans"
              >
                <Image src={logo} alt={name + " logo"} width={240} height={96} className="max-w-full max-h-full object-contain"/>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 pt-10 border-t border-separator theme-trans">
            <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-4 theme-trans">Interested in supporting the community?</p>
            <Button href="https://discord.gg/v6gchdH43K" target="_blank" variant="secondary" className="inline-flex flex-row gap-2 items-center">
              Become a sponsor
              <ArrowUpRightIcon></ArrowUpRightIcon>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
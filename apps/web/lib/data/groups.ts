import groupCategories from './groupCategories';
import { CommunityGroup } from '../types/group';
import propFromKeys from './propFromKeys';
import { brandColorFromBackground } from '../group-brand-color';

const uncoloredGroups: Record<string, Omit<Omit<CommunityGroup, 'background'>, 'id'>> = {
  'lady-devs': {
    name: 'Lady Devs',
    icon: '/images/groups/icons/people.svg',
    category: groupCategories['Community'],
    topic: 'Women in Technology',
    description: 'Supporting women in technology through networking and professional development',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/Orlando-Lady-Developers-Meetup',
        title: 'Orlando Lady Developers Meetup',
        description: 'Come explore tech with us. We are committed increasing the influence that women have in building the technologies that shape our culture and change our world.\n'
                   + 'Countless studies show the benefits of approaching problems with diverse teams, yet women are grossly underrepresented in tech departments, on software development teams, in AI, in technical graphic design, and computer science classrooms.\n'
                   + 'The more diversity we have in tech, the more inclusive the technologies that shape our culture will become.\n'
                   + 'Orlando Lady Developers welcomes everyone -- we mean that -- everyone. That includes women, men, trans-women, non-binary people, trans-men, and those who may be questioning their gender.\n'
                   + 'We encourage men working as developers, designers, or in tech-related fields to join us. Let\'s work together to bring more women and under-represented folk into technology innovation and software development and empower them to develop next-generation technologies.',
        members: 1719, // note: maybe pull from source in the future?
        image: '/images/groups/images/orlando-lady-devs-meetup.avif',
      }
    ],
  }, 
  'orlando-devs': {
    name: 'Orlando Devs',
    icon: '/images/groups/icons/tag-markup.svg',
    category: groupCategories['General'],
    topic: 'Software Development',
    description: 'The main Orlando developer community meetup group',
    longDescription: 'A close-knit community sculpted by the talent of Orlando and Central Florida developers.',
    logo: '/images/logo.png',
    websiteUrl: 'https://orlandodevs.com',
    brandColor: '#5B4FE9',
    eventSources: [
      { 
        platform: 'meetup', 
        url: 'https://www.meetup.com/orlandodevs/',
        title: 'Orlando Developers Meetup',
        description: 'The Orlando Developers User Group is for developers of all skill levels in the Orlando area to come '
                   + 'learn about improving yourself as a developer. We focus primarily on professional development and soft '
                   + 'skills, but we will also be featuring technical talks and presentations on various different subjects '
                   + 'that our community is interested in.',
        members: 8492,
        image: '/images/groups/images/orlando-devs-meetup.avif',
      }, {
        platform: 'discord',
        url: 'https://discord.gg/GRjjPM2zUy',
      }
    ],
  },
  'open-orlando': {
    name: 'Open Orlando',
    icon: '/images/groups/icons/globe.svg',
    category: groupCategories['Civic Tech'],
    topic: 'Open Source Civic Technology',
    description: 'Civic technology and open source projects for Orlando',
    websiteUrl: 'https://codefororlando.com/',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/open-orlando',
        title: 'Open Orlando',
        description: 'Open Orlando (formerly known as Code for Orlando) is now a member of Orlando Devs and aims to bring the community together to improve Orlando through technology. We are a group of “civic hackers” from various disciplines who are committed to volunteering our talents to make a difference. We unite to improve the way residents and local government experience Orlando.',
        members: 2249,
        image: '/images/groups/images/open-orlando-meetup.avif',
      }, {
        platform: 'eventbrite',
        url: 'https://www.eventbrite.com/o/code-for-orlando-33511214869',
        title: 'Open Orlando',
        description: 'Open Orlando is a non-partisan, civic action-oriented group of community organizers, technologists and residents who contribute their expertise to make a difference in the local community. Our mission is to bring the community together to improve Orlando through technology.',
        members: 18,
      }
    ],
  },
  'orlando-innovation-league': {
    name: 'Orlando Innovation League',
    icon: '/images/groups/icons/lightning.svg',
    category: groupCategories['Innovation'],
    topic: 'innovation and entrepreneurship',
    description: 'Innovation and entrepreneurship in the Orlando tech scene',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/orlando-innovation-league',
        title: '🔥 Orlando Innovation League',
        description: 'Welcome to the Orlando Innovation League!\n'
                   + 'You might have known us as Lean Startup Orlando - but innovation is #NotJustAboutStartups - it\'s about innovation methodology across all business domains.\n'
                   + 'We are an ambitious group of startup founders, enterprise leaders, investors, mentors, entrepreneurial enthusiasts, product developers, and innovation leaders. Our Meetup group serves the Central Florida community as a platform to share experiences, learnings, questions and thoughts about innovation.\n'
                   + '"The Lean Startup" by Eric Reis is a book that deeply inspired us but it applies to all kinds of organizations and our topics go beyond it to modern innovation methodology including Design Thinking, Agile, Data-driven decision making and includes thought leadership from Alex Osterwalder, Steve Blank, Ash Maurya, Pete Diamandis, and others. Our presenters and guest speakers represent the startup community, non-profits and social enterprises, and large enterprise - and together - our goal is to make innovation accessible to EVERYONE.\n'
                   + 'We curate speakers from the Orlando community, and oftentimes, we will feature guest speakers from Silicon Valley and other entrepreneurial ecosystems.\n'
                   + 'For a group that truly is a mix of people engaged in innovation from varied backgrounds - join us for our next event!',
        members: 2351,
        image: '/images/groups/images/orlando-innovation-league-meetup.avif',
      }
    ],
  },
  'php-orlando': {
    name: 'PHP Orlando',
    icon: '/images/groups/icons/tag-markup.svg',
    category: groupCategories['Language'],
    topic: 'PHP',
    description: 'PHP developers and enthusiasts in Central Florida',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/orlandophp',
        title: 'Orlando PHP Meetup | Orlando Devs',
        description: 'The Orlando PHP Meetup is open to anyone excited about or wanting to learn more about the PHP programming language.\n'
                   + 'PHP is used as a foundation for web frameworks such as Laravel and Symfony, and is ubiquitously used in modern web application development.\n'
                   + 'We meet periodically and provide expert talks, a friendly social atmosphere, snacks and refreshments, and networking opportunities.\n'
                   + 'All skill levels are welcome: students and learners are encouraged to attend.',
        members: 1219,
        image: '/images/groups/images/orlando-php-meetup.avif'
      },
    ],
  },
  'orlando-js': {
    name: 'Orlando JS',
    icon: '/images/groups/icons/tag-markup.svg',
    category: groupCategories['Language'],
    topic: 'JavaScript',
    description: 'JavaScript developers and modern web technologies',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/OrlandoJS',
        title: 'OrlandoJS',
        description: 'The Orlando JavaScript group is a place to talk about all things JavaScript. Our mission is to facilitate networking of professionals and enthusiasts. We hold monthly meetups on various topics around the JavaScript ecosystem. ALL LEVELS ARE WELCOME, especially those who are just getting started with coding and would like to learn more about the software industry.\n'
                   + 'We are always looking for companies to collaborate with. If your company is interested in sponsoring our group, please reach out to one of us organizers.\n'
                   + 'Hope to see you on our next meetup!',
        members: 1927,
        image: '/images/groups/images/orlando-js-meetup.avif',
      },
    ],
  },
  'project-codex': {
    name: 'Project Codex',
    icon: '/images/groups/icons/tag-markup.svg',
    category: groupCategories['Projects'],
    topic: 'Project development',
    description: 'Collaborative coding and project development',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/project-codex',
        title: 'Project Codex',
        description: 'We provide talks and workshops to help junior developers grow their skill set and enter the workforce.',
        members: 1561,
        image: '/images/groups/images/project-codex-meetup.avif',
      }
    ],
  },
  'orlando-devops': {
    name: 'Orlando DevOps',
    icon: '/images/groups/icons/tag-markup.svg',
    category: groupCategories['DevOps'],
    topic: 'DevOps',
    description: 'DevOps practices, tools, and culture',
    longDescription:
        'A group for anyone interested in DevOps practices, including build automation, continuous deployment, cloud enablement, infrastructure as code, and developer collaboration.',  
    brandColor: '#475569',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/Orlando-DevOps',
        title: 'Orlando DevOps',
        description: 'This is a group for anyone interested in DevOps practices, including build automation, continuous deployment, Cloud enablement, load testing, software quality, infrastructure as code, developer collaboration, Agile software development practices, and more.',
        members: 1064,
        image: '/images/groups/images/orlando-devops-meetup.avif',
      },
    ],
  },
  'central-florida-android': {
    name: 'Central Florida Android',
    icon: '/images/groups/icons/smartphone.svg',
    category: groupCategories['Mobile'],
    topic: 'Mobile and Android Development',
    description: 'Android development and mobile technologies',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/central-florida-android-developers-group',
        title: 'Central Florida Android Developers Group',
        description: 'A group for developers of all skill levels to network, share information, and learn from each other. We also host the http://www.meetup.com/Orlando-iOS-Developer-Group at our offices in downtown Orlando ( http://www.justecho.com ) and will regularly meet for group discussions, network or job opportunities, and to share ideas and whatever projects group members are working on.\n' // note: group no longer exists on meetup
                   + 'Check out some of our recorded talks at https://www.youtube.com/channel/UCiYWIGcU4GYrJM_6k5cvCoQ\n'
                   + 'Sorry but due to current membership suggestions, no recruiters or non-tech attendees.',
        members: 1015,
        image: '/images/groups/images/cf-android-devs-group-meetup.avif',
      },
    ],
  },
  'front-end-orlando': {
    name: 'Front End Orlando',
    icon: '/images/groups/icons/tag-markup.svg',
    category: groupCategories['Frontend'],
    topic: 'Frontend Development',
    description: 'Front-end development, UI/UX, and modern web frameworks',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/front-end-orlando',
        title: 'Front End Devs Orlando',
        description: 'A community of front end developers coming together to learn and connect. We cover everything front end, from new technologies to evolving best practices.\n'
                   + 'Come share your knowledge, projects, ideas, feedback and encouragement!',
        members: 2067,
        image: '/images/groups/images/front-end-devs-orlando-meetup.avif',
      },
    ],
  },
  'orlando-aws': {
    name: 'Orlando AWS',
    icon: '/images/groups/icons/cloud.svg',
    category: groupCategories['Cloud'],
    topic: 'AWS',
    description: 'Amazon Web Services user group for cloud computing enthusiasts',
    logo: '/images/groups/logos/orlando-aws-logo.avif',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/orlandoaws',
        title: 'Orlando AWS User Group',
        description: 'Welcome, AWS Enthusiasts of Orlando!\n'
                   + 'This group is open to everyone passionate about the AWS ecosystem – from end users and AWS partners to students and cloud enthusiasts. Whether you\'re a seasoned professional or just starting out, our goal is to create a collaborative environment where we can learn, share, and grow together.'
                   + 'We meet monthly, with event formats that include hands-on labs, deep dives into AWS technologies, introductions to new AWS services, and networking opportunities.\n'
                   + 'Interested in getting involved? Whether as a speaker, sponsor, or event host, we’d love to hear from you. Connect with us on LinkedIn: Orlando AWS User Group.\n'
                   + 'We look forward to connecting with you soon!\n'
                   + 'We are proud to be part of Orlando Devs. Join our Discord to be part of the Orlando Devs and AWS community!\n',
        members: 1419,
        image: '/images/groups/images/orlando-aws-meetup.avif',
      },
    ],
  },
  'accelerate-orlando': {
    name: 'Accelerate Orlando',
    description: 'Startup acceleration and entrepreneurship events',
    topic: 'Technology and Future',
    icon: '/images/groups/icons/lightning.svg',
    category: groupCategories['Startup'],
    brandColor: '#EA580C',
    eventSources: [
      {
        platform: 'luma',
        url: 'https://luma.com/accelerateorlando',
        title: 'Accelerate Orlando',
        description: 'Accelerate Orlando is a new local group focused on principles from the techno-optimist and e/acc movements.',
        image: '/images/groups/images/accelerate-orlando-luma.avif',
      },
    ],
  },
  'build-the-future': {
    name: 'Build the Future',
    icon: '/images/groups/icons/lightning.svg',
    category: groupCategories['Innovation'],
    topic: 'The Future',
    description: 'Future-focused technology and innovation discussions',
    logo: '/images/groups/logos/build-the-future-orlando-logo.avif',
    eventSources: [
      {
        platform: 'luma',
        url: 'https://lu.ma/BuildTheFutureOrlando',
        title: 'Build the Future Orlando',
        description: 'We are a community for sharing field notes on how to 100x yourself with AI',
        image: '/images/groups/images/build-the-future-orlando-luma.avif'
      },
    ],
  },
  'otab': {
    name: 'Orlando Tech and Beer',
    icon: '/images/groups/icons/people.svg',
    category: groupCategories['Community'],
    topic: 'Social',
    description: 'Connect. Collaborate. Inspire.',
    longDescription: 'A monthly networking and social event hosted by Accelerate Orlando & Orlando Devs.',
    logo: '/images/groups/logos/otab-logo.avif',
    eventSources: [
      {
        platform: 'luma',
        url: 'https://lu.ma/otab',
        title: 'Orlando Tech and Beer',
        description: 'Connect. Collaborate. Inspire.',
      },
    ],
  },
  'ai-plus-data-orlando': {
    name: 'AI + Data Orlando',
    icon: '/images/groups/icons/lightning.svg',
    category: groupCategories['Innovation'],
    topic: 'AI and Data',
    description: 'Orlando based AI, Data Analytics and Data Science Meetup group',
    eventSources: [
      {
        platform: 'meetup',
        url: 'https://www.meetup.com/ai-data-analytics-and-data-science-orlando',
        title: 'AI + Data Orlando',
        description: 'Orlando based AI, Data Analytics and Data Science Meetup group to discuss latest topics in Artificial Intelligence, Generative AI, AI agents, Responsible AI, Ethics, Data Science, Data Analytics and networking',
        image: '/images/groups/images/ai-plus-data-orlando-meetup.avif',
      }
    ],
  },
};

export const colors = [
  { background: 'bg-[#5B4FE9]'},
  { background: 'bg-[#EA580C]'},
  { background: 'bg-[#0D9488]'},
  { background: 'bg-[#E11D48]'},
  { background: 'bg-[#0284C7]'},
  { background: 'bg-[#D97706]'},
  { background: 'bg-[#7C3AED]'},
  { background: 'bg-[#059669]'},
  { background: 'bg-[#DB2777]'},
  { background: 'bg-[#0891B2]'},
  { background: 'bg-[#DC2626]'},
  { background: 'bg-[#65A30D]'},
  { background: 'bg-[#C026D3]'},
  { background: 'bg-[#2563EB]'},
  { background: 'bg-[#475569]'},
]

const groups: Record<string, CommunityGroup> =
  Object.fromEntries(
    Object.values(propFromKeys('id', uncoloredGroups))
      .map((group, i) => {
        const { background } = colors[i]

        return {
          ...group,
          background,
          brandColor: group.brandColor ?? brandColorFromBackground(background) ?? '#5B4FE9',
        }
      })
      .sort((groupA, groupB) => (groupB.eventSources[0].members ?? 0) - (groupA.eventSources[0].members ?? 0))
      .map(group => [group.id, group])
  );

export default groups;
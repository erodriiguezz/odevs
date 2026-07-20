import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Code of Conduct - Orlando Devs",
  description: "The code of conduct for Orlando Devs.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-primary/60 pl-5">
      <h2 className="text-2xl font-semibold text-foreground font-display">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CodeOfConductPage() {
  return (
    <section className="bg-background text-foreground py-14 min-h-screen relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          label="Community"
          title="Code of Conduct"
          description="This code outlines expectations for participants within the Orlando Devs community — Discord, meetups, and events — and the steps for reporting unacceptable behavior. Anyone who violates this code may be removed from the community."
        />
        <div className="flex flex-col gap-12 mt-12">
          <Section title="Our open source community strives to be">
            <p>
              <strong key="a" className="text-foreground">
                Be friendly and patient.
              </strong>
            </p>

            <p>
              <strong className="text-foreground">Be welcoming:</strong> We
              strive to be a community that welcomes and supports people of all
              backgrounds and identities. This includes, but is not limited to
              members of any race, ethnicity, culture, national origin, color,
              immigration status, social and economic class, educational level,
              sex, sexual orientation, gender identity and expression, age,
              size, family status, political belief, religion, and mental and
              physical ability.
            </p>
            <p>
              <strong className="text-foreground">Be considerate:</strong> Your
              actions (and words) affect users and colleagues, and you should
              take those consequences into account. Remember that we&apos;re a
              very diverse community, so you might not be communicating in
              someone else&apos;s primary language.
            </p>
            <p>
              <strong className="text-foreground">Be respectful:</strong> Not
              all of us will agree all the time, but disagreement is no excuse
              for poor behavior and poor manners. We might all experience some
              frustration now and then, but we cannot allow that frustration to
              turn into a personal attack. It&apos;s important to remember that
              a community where people feel uncomfortable or threatened is not a
              productive one.
            </p>
            <p>
              <strong className="text-foreground">
                Be careful in the words that we choose:
              </strong>{" "}
              we are a community of professionals, and we conduct ourselves
              professionally. Be kind to others. Do not insult or put down other
              participants. Harassment and other exclusionary behavior
              aren&apos;t acceptable.
            </p>
            <p>
              <strong className="text-foreground">
                Try to understand why we disagree:
              </strong>{" "}
              Disagreements, both social and technical, happen all the time. It
              is important that we resolve disagreements and differing views
              constructively. Remember that we&apos;re different. The strength
              of our community comes from its diversity, people from a wide
              range of backgrounds. Different people have different perspectives
              on issues. Being unable to understand why someone holds a
              viewpoint doesn&apos;t mean that they&apos;re wrong. Don&apos;t
              forget that it is human to err and blaming each other doesn&apos;t
              get us anywhere. Instead, focus on helping to resolve issues and
              learning from mistakes.
            </p>
          </Section>

          <Section title="Definitions">
            <p>Harassment includes, but is not limited to:</p>
            <Bullets
              items={[
                "Offensive comments related to gender, gender identity and expression, sexual orientation, disability, mental illness, neuro(a)typicality, physical appearance, body size, race, age, regional discrimination, political or religious affiliation.",
                "Unwelcome comments regarding a person's lifestyle choices and practices, including those related to food, health, parenting, drugs, and employment.",
                "Deliberate misgendering. This includes deadnaming or persistently using a pronoun that does not correctly reflect a person's gender identity. You must address people by the name they give you when not addressing them by their username or handle.",
                'Physical contact and simulated physical contact (eg, textual descriptions like "hug" or "backrub") without consent or after a request to stop.',
                "Threats of violence, both physical and psychological.",
                "Incitement of violence towards any individual, including encouraging a person to commit suicide or to engage in self-harm.",
                "Deliberate intimidation.",
                "Stalking or following.",
                "Harassing photography or recording, including logging online activity for harassment purposes.",
                "Sustained disruption of discussion.",
                "Unwelcome sexual attention, including gratuitous or off-topic sexual images or behaviour.",
                "Pattern of inappropriate social contact, such as requesting/assuming inappropriate levels of intimacy with others.",
                "Continued one-on-one communication after requests to cease.",
                'Deliberate "outing" of any aspect of a person\'s identity without their consent except as necessary to protect others from intentional abuse.',
                "Publication of non-harassing private communication.",
              ]}
            />
          </Section>

          <Section title="Diversity Statement">
            <p>
              We encourage everyone to participate and are committed to building
              a community for all. Although we will fail at times, we seek to
              treat everyone both as fairly and equally as possible. Whenever a
              participant has made a mistake, we expect them to take
              responsibility for it. If someone has been harmed or offended, it
              is our responsibility to listen carefully and respectfully, and do
              our best to right the wrong.
            </p>
            <p>
              Although this list cannot be exhaustive, we explicitly honor
              diversity in age, gender, gender identity or expression, culture,
              ethnicity, language, national origin, political beliefs,
              profession, race, religion, sexual orientation, socioeconomic
              status, and technical ability. We will not tolerate discrimination
              based on any of the protected characteristics above, including
              participants with disabilities.
            </p>
          </Section>

          <Section title="Reporting Issues">
            <p>
              If you experience or witness unacceptable behavior—or have any
              other concerns—please report it by contacting us using via:
            </p>
            <p>
              <strong className="text-foreground">Discord:</strong> Select the
              message additional options and select &quot;Report Message&quot;
              and a moderator will get in touch with you promptly.
            </p>

            <p>
              <strong className="text-foreground">
                Meetup &amp; other events:
              </strong>{" "}
              Speak privately in person with organizers at events, or email
              organizers via Meetup.com.
            </p>

            <p>
              All reports will be handled with discretion. In your report please
              include:
            </p>
            <Bullets
              items={[
                "Your contact information.",
                "Names (real, nicknames, or pseudonyms) of any individuals involved. If there are additional witnesses, please include them as well. Your account of what occurred, and if you believe the incident is ongoing. If there is a publicly available record, please include a link.",
                "Any additional information that may be helpful.",
              ]}
            />
            <p>
              After filing a report, a representative will contact you
              personally, review the incident, follow up with any additional
              questions, and make a decision as to how to respond. If the person
              who is harassing you is part of the response team, they will
              recuse themselves from handling your incident. If the complaint
              originates from a member of the response team, it will be handled
              by a different member of the response team. We will respect
              confidentiality requests for the purpose of protecting victims of
              abuse.
            </p>
          </Section>

          <Section title="Attribution & Acknowledgements">
            <p>
              The Orlando Devs Community has joined other community leaders
              (such as Django, Python, Ubuntu, etc) in implementing a slightly
              modified version of the Open Code of Conduct Project created by
              the TODO Group. We cannot thank enough everyone who has helped
              this Code of Conduct become a reality.
            </p>
          </Section>
        </div>
      </div>
    </section>
  );
}

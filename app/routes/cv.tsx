import "app/components/cv/cv.css";
import PersonalInfo from "~/components/cv/PersonalInfo";
import Experience from "~/components/cv/Experience";
import Project from "~/components/cv/Project";
import Section from "~/components/cv/Section";

import { Experiences, Education } from "~/data/cv.json";

const generateRandomArray = (maxLength: number = 10) =>
  Array.from({ length: Math.floor(Math.random() * maxLength) }, (_, i) => i);

export default function CV() {
  return (
    <>
      <PersonalInfo />

      <Section header="Education">
        {Object.entries(Education).map(([school, education]) => (
          <Experience
            key={school}
            tl={school}
            tr={education.location}
            bl={education.degree}
            br={education.duration}
          >
            <p>{education.project}</p>
          </Experience>
        ))}
      </Section>

      <Section header="Work Experience">
        {Object.entries(Experiences).map(([company, experience]) => (
          <Experience
            key={company}
            tl={company}
            tr={experience.location}
            bl={experience.position}
            br={experience.duration}
          >
            {experience.projects.map((project) => (
              <Project
                key={project.title}
                title={project.title}
                descriptions={project.descriptions}
                tags={project.tags}
              />
            ))}
          </Experience>
        ))}
      </Section>

      <Section header="Projects">
        <Project
          title="Title"
          descriptions={generateRandomArray().map((i) => `Description ${i}`)}
          tags={generateRandomArray().map((i) => `Tag ${i}`)}
        />
        <Project
          title="Title"
          descriptions={generateRandomArray().map((i) => `Description ${i}`)}
          tags={generateRandomArray().map((i) => `Tag ${i}`)}
        />
      </Section>
    </>
  );
}

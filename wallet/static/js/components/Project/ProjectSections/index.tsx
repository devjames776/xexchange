import React from "react";
import {
  Section,
  SectionChart,
  SectionIconList,
  SectionPartners,
  SectionRoadmap,
  SectionTable,
  SectionTeam,
  SectionFaq,
} from "components";

export type ProjectSectionType = {
  __component: string;
};

const ProjectSections = ({ data }: { data: Array<ProjectSectionType> }) =>
  data && data.length > 0 ? (
    <>
      {data.map((section: any, index: number) => {
        switch (section.__component) {
          case "sections.section":
            return (
              <div key={section.__component + index}>
                <Section data={section} />
              </div>
            );
          case "sections.team":
            return (
              <div key={section.__component + index}>
                <SectionTeam data={section} />
              </div>
            );
          case "sections.table":
            return (
              <div key={section.__component + index}>
                <SectionTable data={section} />
              </div>
            );
          case "sections.partners":
            return (
              <div key={section.__component + index}>
                <SectionPartners data={section} />
              </div>
            );
          case "sections.icon-list":
            return (
              <div key={section.__component + index}>
                <SectionIconList data={section} />
              </div>
            );
          case "sections.chart":
            return (
              <div key={section.__component + index}>
                <SectionChart data={section} />
              </div>
            );
          case "sections.roadmap":
            return (
              <div key={section.__component + index}>
                <SectionRoadmap data={section} />
              </div>
            );
          case "sections.faq":
            return (
              <div key={section.__component + index}>
                <SectionFaq data={section} />
              </div>
            );
        }
      })}
    </>
  ) : null;

export default ProjectSections;

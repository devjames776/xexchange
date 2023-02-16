import React from "react";
import { Timeline } from "components";
import ContractStatus from "components/ContractStatus";

const Announcement = ({ project }: { project: any }) => {
  const announcement = project.announcement;
  return (
    <>
      <div className="project-announcement card border-0 shadow p-0">
        <ContractStatus projectData={project} />
      </div>
      {announcement && (announcement.timeline1 || announcement.timeline2) && (
        <div className="card mt-spacer border-0 shadow">
          <div className="timeline p-spacer">
            {announcement.content.title && (
              <h2 className="mb-3">{announcement.content.title}</h2>
            )}
            {announcement.timelineTitle1 && (
              <div className="phase">
                <p>{announcement.timelineTitle1}</p>
              </div>
            )}
            {announcement.timeline1 && (
              <Timeline timeline={announcement.timeline1} />
            )}
            {announcement.timelineTitle2 && (
              <div className="phase">
                <p className="mt-spacer pt-3 border-top">
                  {announcement.timelineTitle2}
                </p>
              </div>
            )}
            {announcement.timeline2 && announcement.timeline2.length > 0 && (
              <Timeline timeline={announcement.timeline2} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;

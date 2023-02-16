import * as React from "react";
import ReactMarkdown from "react-markdown";

export type ProjectRoadmapDataType = {
  complete: boolean;
  special: boolean;
  title: string;
  milestones: string;
};

const Timeline = ({
  timeline,
}: {
  timeline: Array<ProjectRoadmapDataType>;
}) => (
  <>
    {timeline && (
      <div className="timeline-wrapper">
        {timeline.map((step: any, index: number) => (
          <div
            className={`step ${step.complete ? "completed" : ""} ${
              step.special ? "special" : ""
            }`}
            key={step.title + index}
          >
            {step.title && <p className="h6">{step.title}</p>}
            {step.milestones && (
              <div
                className={`milestones pt-2 ${
                  index === timeline.length - 1 ? "pb-0" : "pb-2"
                }`}
              >
                <ReactMarkdown linkTarget="_blank">
                  {step.milestones.replaceAll("\\n", "\n")}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </>
);

export default Timeline;

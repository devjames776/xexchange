import * as React from "react";
import ReactMarkdown from "react-markdown";
import { SocialIcons, Image } from "components";

const ProjectHero = ({ data, title }: { data: any; title?: string }) => (
  <div className="card-header project-hero text-center p-5">
    {data.logo && <Image data={data.logo} className="logo mb-spacer" />}
    {(title || data.content.title) && (
      <div className="description h2 mb-spacer">
        <ReactMarkdown linkTarget="_blank">
          {title ? title : data.content.title}
        </ReactMarkdown>
      </div>
    )}
    {data.social && <SocialIcons icons={data.social} />}
  </div>
);

export default ProjectHero;

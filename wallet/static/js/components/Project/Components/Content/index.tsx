import * as React from "react";
import ReactMarkdown from "react-markdown";
import { Image } from "components";
import { CMSSectionContent } from "helpers/types";

const Content = ({ content }: { content: CMSSectionContent }) => (
  <>
    {content.title && <h2 className="my-spacer">{content.title}</h2>}
    {content.subtitle && <h2 className="my-spacer">{content.subtitle}</h2>}
    {content.video && (
      <div className="video-wrapper mb-spacer">
        <iframe
          width="634"
          height="356"
          src={`${content.video}?rel=0&modestbranding=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )}
    {content.description && (
      <div className="text-secondary">
        <ReactMarkdown linkTarget="_blank">
          {content.description.replaceAll("\\n", "\n")}
        </ReactMarkdown>
      </div>
    )}
    {content.image && (
      <Image
        data={content.image}
        className="d-flex mx-auto mb-spacer"
        rounded={true}
      />
    )}
  </>
);

export default Content;

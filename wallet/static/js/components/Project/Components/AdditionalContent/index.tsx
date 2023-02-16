import * as React from "react";
import ReactMarkdown from "react-markdown";
import { CMSSectionContent } from "helpers/types";

const AdditionalContent = ({ content }: { content: CMSSectionContent }) => (
  <>
    {content?.details && (
      <div className="details text-secondary mb-spacer">
        <ReactMarkdown linkTarget="_blank">
          {content.details.replaceAll("\\n", "\n")}
        </ReactMarkdown>
      </div>
    )}
    {content?.disclaimer && (
      <div className="disclaimer text-secondary my-3">
        <ReactMarkdown linkTarget="_blank">
          {content.disclaimer.replaceAll("\\n", "\n")}
        </ReactMarkdown>
      </div>
    )}
  </>
);

export default AdditionalContent;

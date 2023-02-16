import * as React from "react";
import { AdditionalContent, Content } from "components";
import { CMSSectionContent } from "helpers/types";

const Section = ({ data }: { data: { content: CMSSectionContent } }) => {
  return (
    <div
      className={`section ${
        data?.content?.title
          ? String(data.content.title).toLowerCase().replace(/\W/g, "")
          : ""
      }`}
    >
      {data.content && (
        <>
          <Content content={data.content} />
          <AdditionalContent content={data.content} />
        </>
      )}
    </div>
  );
};

export default Section;

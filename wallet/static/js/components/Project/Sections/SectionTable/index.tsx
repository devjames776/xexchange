import * as React from "react";
import { AdditionalContent, Content, Table } from "components";
import { CMSSectionContent } from "helpers/types";

const SectionTable = ({
  data,
}: {
  data: { content: CMSSectionContent; table: any };
}) => {
  return (
    <div
      className={`section-table ${
        data?.content?.title
          ? String(data.content.title).toLowerCase().replace(/\W/g, "")
          : ""
      }`}
    >
      {data.content && <Content content={data.content} />}
      {data.table && <Table table={data.table} />}
      {data.content && <AdditionalContent content={data.content} />}
    </div>
  );
};

export default SectionTable;

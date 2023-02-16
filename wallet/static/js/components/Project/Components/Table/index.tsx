import * as React from "react";
import ReactMarkdown from "react-markdown";

const Table = ({
  table,
}: {
  table: Array<Array<{ link: string; text: string }>>;
}) => (
  <div className="border shadow-sm rounded overflow-hidden">
    <div className="table-responsive">
      <table className="table table-striped table-component">
        <thead className="thead-light">
          <tr>
            {table[0].map((cell: any, cellIndex: number) => (
              <th key={`${cell.text}-${cellIndex}-th`}>
                <ReactMarkdown linkTarget="_blank">
                  {cell.text.replaceAll("\\n", "\n")}
                </ReactMarkdown>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {table.map((row: any, index: number) => {
            return index === 0 ? null : (
              <tr key={index}>
                {row.map((cell: any, rowindex: number) => (
                  <td key={`${cell.text}-${rowindex}-th`}>
                    {cell.link ? (
                      <a
                        href={cell.link}
                        target="_blank"
                        rel="noreferrer nofollow"
                      >
                        {cell.text}
                      </a>
                    ) : (
                      <ReactMarkdown linkTarget="_blank">
                        {cell.text.replaceAll("\\n", "\n")}
                      </ReactMarkdown>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;

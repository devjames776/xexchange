import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";
import { AdditionalContent, Content, Image } from "components";
import { getIcon } from "helpers";

const Link = ({
  children,
  link,
  label,
}: {
  children: React.ReactNode;
  link?: string;
  label?: string;
}) => {
  return link ? (
    <a href={link} rel="noreferrer nofollow" target="_blank" aria-label={label}>
      {children}
    </a>
  ) : (
    <>{children}</>
  );
};

const SectionIconList = ({ data }: { data: any }) => (
  <div
    className={`section-icon-list ${
      data?.content?.title
        ? String(data.content.title).toLowerCase().replace(/\W/g, "")
        : ""
    }`}
  >
    {data.content && <Content content={data.content} />}
    <div className="row">
      {data.image?.data && (
        <div className="col-12 col-sm-6 d-flex align-items-center">
          <Image
            data={data.image}
            className="d-flex my-spacer"
            rounded={true}
          />
        </div>
      )}
      {data.icons && (
        <div className={`col-12 ${data.image?.data ? "col-sm-6" : ""}`}>
          <dl className="card rounded shadow-sm d-flex flex-row flex-wrap align-items-start justify-content-around mb-spacer p-3">
            {data.icons.map((detail: any) => {
              const hasFlag = String(detail.icon)
                .toLowerCase()
                .includes("showflag");
              const iconArray = String(detail.icon).split("-");
              const flag = hasFlag && iconArray[1] ? iconArray[1] : "";
              const icon = detail.icon
                ? flag
                  ? `${iconArray[iconArray.length - 2]}-${
                      iconArray[iconArray.length - 1]
                    }`
                  : detail.icon
                : "";

              return (
                <div
                  className="details-card p-2 text-center"
                  key={detail.description}
                >
                  <Link link={detail.link} label={detail.description}>
                    {icon && (
                      <dd
                        className={`h3 text-primary mb-1 has-flag ${
                          flag ? `has-flag-${flag}` : ""
                        }`}
                      >
                        <FontAwesomeIcon icon={getIcon(icon)} />
                      </dd>
                    )}
                    {detail.title && (
                      <dd className="h5 text-primary mb-1">{detail.title}</dd>
                    )}
                    {detail?.description && (
                      <dt className="mb-0 font-weight-light text-decoration-none text-body">
                        <ReactMarkdown linkTarget="_blank">
                          {detail.description.replaceAll("\\n", "\n")}
                        </ReactMarkdown>
                      </dt>
                    )}
                  </Link>
                </div>
              );
            })}
          </dl>
        </div>
      )}
    </div>
    {data.content && <AdditionalContent content={data.content} />}
  </div>
);

export default SectionIconList;

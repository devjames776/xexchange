import * as React from "react";
import { Accordion, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { AdditionalContent, Content } from "components";
import CollapsibleArrows from "components/CollapsibleArrows";

const SectionFaq = ({ data }: { data: any }) => {
  const firstId =
    data.faq && data.faq.length > 0 ? data.faq[0]["id"].toString() : "1";
  const [activeRow, setActiveRow] = React.useState<string>(firstId);
  const toggleActiveRow = (id: string) => {
    if (activeRow === id) {
      setActiveRow("");
    } else {
      setActiveRow(id);
    }
  };

  return (
    <div
      className={`section-faq ${
        data?.content?.title
          ? String(data.content.title).toLowerCase().replace(/\W/g, "")
          : ""
      }`}
    >
      {data.content && <Content content={data.content} />}
      {data.faq && data.faq.length > 0 && (
        <Accordion defaultActiveKey={firstId} className="shadow-sm">
          {data.faq.map((question: any) => (
            <Card key={`qna-${question.id}`}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={question.id.toString()}
                onClick={() => toggleActiveRow(question.id.toString())}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="mr-spacer">{question.question}</div>
                  <CollapsibleArrows
                    expanded={activeRow === question.id.toString()}
                  />
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={question.id.toString()}>
                <Card.Body>
                  <ReactMarkdown linkTarget="_blank">
                    {question.answer.replaceAll("\\n", "\n")}
                  </ReactMarkdown>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      )}
      {data.content && <AdditionalContent content={data.content} />}
    </div>
  );
};

export default SectionFaq;

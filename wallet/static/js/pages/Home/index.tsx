import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Typewriter from "typewriter-effect";
import { Loader, HeroContent } from "components";
import { useCMS, currentProject } from "config";
import { getContent, useApiRequests } from "helpers";

const Home = () => {
  const ref = React.useRef(null);

  const { getCMSData } = useApiRequests();

  const [project, setProject] = useState<any>();
  const [projectFetched, setProjectFetched] = useState(false);

  useEffect(() => {
    if (ref.current !== null && !projectFetched) {
      if (useCMS) {
        fetchProjectData();
      } else {
        const data = getContent(currentProject);
        setProjectFetched(true);
        setProject(data);
      }
    }
  }, []);

  const fetchProjectData = async () => {
    const cmsResult = await getCMSData();

    if (cmsResult.success) {
      setProjectFetched(true);
      setProject(cmsResult.data[0].atributes);
    }
  };

  const projectHero = project?.hero;

  return (
    <div
      className="home d-flex justify-content-center align-items-center flex-fill pb-spacer pt-lg-spacer"
      ref={ref}
    >
      <div className="container d-flex flex-column flex-grow-1">
        {projectFetched && project ? (
          <div className="w-100 text-center d-flex flex-column">
            <div className="title-holder title-shadow mt-5 mb-spacer d-inline-block">
              <div className="h2 mb-0 justify-content-center">
                <h2 className="h2 mb-0 mr-2">
                  {projectHero?.content?.title ??
                    "Technology Is The Fundamental Driver For "}
                </h2>

                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Growth")
                      .pauseFor(5000)
                      .deleteChars(6)
                      .typeString("Progress")
                      .pauseFor(5000)
                      .deleteChars(8)
                      .typeString("Evolution")
                      .pauseFor(5000)
                      .deleteChars(12)
                      .typeString("Growth")
                      .pauseFor(5000)
                      .deleteChars(6)
                      .typeString("Progress")
                      .pauseFor(5000)
                      .deleteChars(8)
                      .typeString("Evolution")
                      .pauseFor(5000)
                      .deleteChars(12)
                      .typeString("Growth")
                      .pauseFor(5000)
                      .deleteChars(6)
                      .typeString("Progress")
                      .pauseFor(5000)
                      .deleteChars(8)
                      .typeString("Evolution")
                      .start();
                  }}
                />
              </div>
              {projectHero?.content?.description && (
                <div className="mb-0 mt-2 lead text-secondary">
                  <ReactMarkdown linkTarget="_blank">
                    {projectHero.content.description.replaceAll("\\n", "\n")}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            <HeroContent project={project} />
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

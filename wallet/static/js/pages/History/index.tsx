import React, { useEffect, useState } from "react";

import { Loader, HeroContent } from "components";
import { useCMS, allProjects } from "config";
import { getContent, useApiRequests } from "helpers";

const History = () => {
  const { getCMSData } = useApiRequests();

  const [projects, setProjects] = useState<any>();
  const [projectFetched, setProjectFetched] = useState(false);

  useEffect(() => {
    if (!projectFetched) {
      if (useCMS) {
        fetchProjectData();
      } else {
        const resultProjects = [];
        for (const projectData of allProjects) {
          resultProjects.push(getContent(projectData.name));
        }
        setProjectFetched(true);
        setProjects(resultProjects.reverse());
      }
    }
  }, [projects]);

  const fetchProjectData = async () => {
    const resultProjects = [];
    for (const projectData of allProjects) {
      const fetchResult = await getCMSData(projectData.name);
      resultProjects.push(fetchResult.data);
      if (!fetchResult.success) {
        throw `Error fetching ${projectData.name} data.`;
      }
    }
    setProjectFetched(true);
    setProjects(resultProjects.reverse());
  };

  return (
    <>
      {projectFetched && projects ? (
        <>
          {projects.map((project: any) => (
            <div
              className="row history d-flex justify-content-center align-items-center flex-fill mb-n5"
              key={project?.name}
            >
              <div className="container d-flex flex-column flex-grow-1">
                <div className="w-100 text-center d-flex flex-column">
                  <HeroContent project={project} />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center h-100">
          <Loader />
        </div>
      )}
    </>
  );
};

export default History;

import React, { useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { Loader } from "components";
import {
  ProjectsType,
  ProjectsEnum,
  useCMS,
  currentProject as configProject,
} from "config";
import { useApiRequests, getContent, getProjectPages } from "helpers";
import { defaultFaqLink } from "helpers/interface/getProjectPages";
import { routeNames } from "routes";
import Announcement from "./Announcement";
import Faq from "./Faq";
import Tabs from "./Tabs";

const Project = () => {
  const ref = React.useRef(null);

  const { getCMSData } = useApiRequests();
  const location = useLocation();
  const linkProject: ProjectsType = location.pathname.split(
    "/",
  )[1] as ProjectsType;
  const currentProject =
    Object.values(ProjectsEnum).includes(linkProject as ProjectsEnum) &&
    linkProject
      ? linkProject
      : configProject;

  const match = useMatch(routeNames[linkProject] || routeNames.home);

  const [project, setProject] = useState<any>();
  const [projectFetched, setProjectFetched] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (ref.current !== null && !projectFetched) {
      if (useCMS) {
        fetchProjectData();
      } else {
        const data = getContent(currentProject);
        if (data) {
          handleProjectData(data);
        }
      }
    }
  }, []);

  const fetchProjectData = async () => {
    const cmsResult = await getCMSData();

    if (cmsResult.success && cmsResult.data[0].atributes) {
      handleProjectData(cmsResult.data[0].atributes);
    }
  };

  const handleProjectData = (data: any) => {
    setProjectFetched(true);
    setProject(data);
  };

  useEffect(() => {
    if (project) {
      const { links } = getProjectPages(project);
      const currentActiveSection =
        match?.params.section && links.includes(match?.params.section)
          ? match.params.section
          : links[0];
      setActiveSection(currentActiveSection);
    }
  }, [match, project]);

  return (
    <div
      className={`${
        activeSection === defaultFaqLink ? defaultFaqLink : "project"
      } project flex-fill pb-spacer`}
      ref={ref}
    >
      <div className="container d-flex flex-column flex-grow-1">
        <div className="row">
          {projectFetched && project && activeSection ? (
            <>
              {activeSection === defaultFaqLink ? (
                <Faq project={project} />
              ) : (
                <>
                  <div className="col-lg-4 order-lg-last">
                    <Announcement project={project} />
                  </div>
                  <div className="col-lg-8 mt-spacer mt-lg-0">
                    <div className="card border-0 shadow small">
                      <Tabs project={project} activeSection={activeSection} />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center mx-auto flex-fill">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;

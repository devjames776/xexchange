import React, { useState, useEffect } from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { ProjectHero, ProjectSections, UnlockBtn } from "components";
import {
  ProjectsType,
  ProjectsEnum,
  currentProject as configProject,
} from "config";
import { getIcon, getProjectPages } from "helpers";

const Tabs = ({
  project,
  activeSection,
}: {
  project: any;
  activeSection: string;
}) => {
  const { address } = useGetAccountInfo();

  const loggedIn = Boolean(address);
  const navigate = useNavigate();
  const location = useLocation();
  const linkProject: ProjectsType = location.pathname.split(
    "/",
  )[1] as ProjectsType;
  const currentProject =
    Object.values(ProjectsEnum).includes(linkProject as ProjectsEnum) &&
    linkProject
      ? linkProject
      : configProject;

  const { pages, links } = getProjectPages(project);

  const [activeKey, setActiveKey] = useState(activeSection ?? links[0]);

  const pageHeroTitle =
    pages.filter((page) => page.link === activeSection)[0]?.pageHeroTitle ??
    project?.projectHero?.content?.title;

  useEffect(() => {
    if (activeSection) {
      setActiveKey(activeSection);
    }
  }, [activeSection]);

  return (
    <Tab.Container
      id="project-tabs"
      defaultActiveKey={activeKey}
      onSelect={(selectedKey) => {
        selectedKey ? setActiveKey(selectedKey) : null;
      }}
    >
      {project.projectHero && (
        <ProjectHero data={project.projectHero} title={pageHeroTitle} />
      )}
      <div className="tabs-nav shadow-sm border mx-auto d-flex flex-row flex-wrap align-items-center justify-content-center">
        {pages.map((page) => {
          if (!page) {
            return null;
          }
          return (
            <Nav.Link
              key={page.title}
              eventKey={page.link}
              className={`${
                page.link
              } tab-button d-flex justify-content-center align-items-center ${
                activeKey === page.link ? "active" : ""
              }`}
              onClick={() => {
                navigate(`/${currentProject}/${page.link}`);
              }}
            >
              {page.icon && (
                <FontAwesomeIcon icon={getIcon(page.icon)} className="mr-2" />
              )}
              {page.title}
              {
                page.title === "NFT Mystery Box"
                  ? " 🔥"
                  : "" /* hacky stuff until strapi fixes emojis */
              }
            </Nav.Link>
          );
        })}
      </div>

      <Tab.Content>
        {pages.map((page) => {
          if (!page || !project[page.page]) {
            return null;
          }

          return (
            <Tab.Pane
              eventKey={page.link}
              className={page.link}
              key={`${page.title}-tab`}
            >
              <div
                className={`sections card-body p-spacer px-sm-5 pt-sm-5 project-${page.link}`}
              >
                <ProjectSections data={project[page.page]} />
              </div>
            </Tab.Pane>
          );
        })}

        {pages.length > 0 && (
          <div className="card-footer p-spacer text-center">
            {activeKey === pages[0].link ? (
              <Nav.Link
                eventKey={pages[1].link}
                className="btn btn-lg btn-primary px-5 d-inline-flex mx-auto"
                onClick={() => {
                  navigate(`/${currentProject}/${pages[1].link}`);
                }}
              >
                Show {pages[1].title}
              </Nav.Link>
            ) : loggedIn ? (
              <Nav.Link
                eventKey={pages[0].link}
                className="btn btn-lg btn-primary px-5 d-inline-flex mx-auto"
                onClick={() => {
                  navigate(`/${currentProject}/${pages[0].link}`);
                }}
              >
                Read {pages[0].title}
              </Nav.Link>
            ) : (
              <UnlockBtn
                large={true}
                className="px-5 d-inline-flex mx-auto"
                text="Register Now"
              />
            )}
          </div>
        )}
      </Tab.Content>
    </Tab.Container>
  );
};

export default Tabs;

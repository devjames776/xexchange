import React from "react";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import { ProjectSections } from "components";
import { ProjectSectionType } from "components/Project/ProjectSections";
import {
  ProjectsType,
  ProjectsEnum,
  currentProject as configProject,
} from "config";
import { getProjectPages } from "helpers";
import { routeNames } from "routes";

import { ReactComponent as ElrondLogo } from "../../../assets/images/logo.svg";
import { ReactComponent as ElrondSymbol } from "../../../assets/images/symbol.svg";

const Faq = ({ project }: { project: { faq: Array<ProjectSectionType> } }) => {
  const linkProject: ProjectsType = location.pathname.split(
    "/",
  )[1] as ProjectsType;
  const currentProject =
    Object.values(ProjectsEnum).includes(linkProject as ProjectsEnum) &&
    linkProject
      ? linkProject
      : configProject;
  const { links } = getProjectPages(project);

  return (
    <div className="col-lg-12 mt-spacer mt-lg-0">
      <div className="card border-0 shadow small">
        <div className="card-header d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center navbar-brand mr-0 py-spacer">
            <ElrondLogo className="main-logo flex-shrink-0 d-none d-xl-block" />
            <ElrondSymbol className="main-symbol flex-shrink-0 d-xl-none" />
            <span
              className="text-secondary text-truncate"
              style={{ paddingBottom: "2px" }}
            >
              Launchpad
            </span>
          </div>
        </div>

        <div className="sections card-body p-spacer px-sm-5 pt-sm-5">
          <ProjectSections data={project.faq} />
        </div>

        <div className="card-footer p-spacer text-center">
          {links.length > 0 && (
            <Link
              className="btn btn-lg btn-primary px-5 d-inline-flex mx-auto"
              to={generatePath(routeNames[currentProject], {
                section: links[0],
              })}
            >
              Back to project
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;

import React from "react";
import { Link } from "react-router-dom";
import { Image } from "components";

const HeroContent = ({ project }: { project: any }) => {
  const heroContent = project?.hero?.content;

  return (
    <>
      {heroContent?.image ? (
        <div className="hero-content mb-lg-spacer pb-spacer">
          <div className="hero-image position-relative my-3 my-sm-5 mx-n2 mx-sm-auto">
            <Image data={heroContent.image} />
            {project.hero?.logo && (
              <Image
                data={project.hero.logo}
                className="logo m-auto position-absolute"
              />
            )}
            {project?.hero?.text && (
              <h1 className="text position-absolute">{project.hero.text}</h1>
            )}

            {project.link && project.name && (
              <Link
                data-testid="homeLink"
                className="btn btn-primary btn-lg position-absolute m-auto"
                to={project.link}
              >
                {project?.hero?.btnText
                  ? project.hero.btnText
                  : `Enter ${project.name}`}
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          {project.link && project.name && (
            <Link
              data-testid="homeLink"
              className="btn btn-primary btn-lg position-absolute m-auto"
              to={project.link}
            >
              Enter {project.name}
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default HeroContent;

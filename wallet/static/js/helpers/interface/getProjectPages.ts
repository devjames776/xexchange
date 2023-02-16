type PageType = "page1" | "page2" | "page3" | "page4";
interface PageDetails {
  page: PageType;
  title: string;
  link: string;
  icon: string;
  pageHeroTitle?: string;
}

export const defaultFaqLink = "kyc-guide";

export const getProjectPages = (project: any) => {
  const pageDefaults: PageDetails[] = [
    {
      page: "page1",
      title: "Rationale",
      link: "rationale",
      icon: "brain",
    },
    {
      page: "page2",
      title: "Project Overview",
      link: "project-overview",
      icon: "chartBar",
    },
    {
      page: "page3",
      title: "How to Guide",
      link: "how-to-guide",
      icon: "lightbulbOn",
    },
    {
      page: "page4",
      title: "Details",
      link: "details",
      icon: "boxHeart",
    },
  ];

  const pages: PageDetails[] = [];
  const links: string[] = [];
  Object.keys(project)
    .filter((key) => key.startsWith("page"))
    .forEach((page) => {
      if (project[page].length > 0) {
        const pageDetails = project[page].filter(
          (component: any) =>
            component.__component === "component.page-details",
        )[0];
        if (pageDetails) {
          pageDetails.page = page;
        }
        const defaultDetails = pageDefaults.filter(
          (defaultPage) => defaultPage.page === page,
        )[0];
        const detail = pageDetails ?? defaultDetails;
        if (project?.projectHero?.[`${page}Title`]) {
          detail.pageHeroTitle = project?.projectHero?.[`${page}Title`];
        }
        links.push(detail.link);
        pages.push(detail);
      }
    });

  if (project.faq) {
    links.push(defaultFaqLink);
  }

  return {
    pages,
    links,
  };
};

export default getProjectPages;

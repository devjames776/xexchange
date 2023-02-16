import * as React from "react";
import ModalContainer from "components/ModalContainer";
import { allProjects, ProjectsType } from "config";
import { capitalizeFirstLetter } from "helpers";
import Account from "pages/Account";
import Admin from "pages/Admin";
import History from "pages/History";
import Home from "pages/Home";
import Project from "pages/Project";
import UnlockModal from "pages/Unlock";
import UpdateAddress from "pages/UpdateAddress";
import UpdateAddressAcknowledge from "pages/UpdateAddressAcknowledge";
import UpdateAddressEmail from "pages/UpdateAddressEmail";
import withPageTitle from "./components/PageTitle";

interface RouteType {
  path: string;
  title: string;
  component: any;
  authenticatedRoute?: boolean;
}

export type BackgroundRoutesType =
  | "home"
  | "provideEmail"
  | "confirmationSent"
  | "confirmEmailValidation"
  | "emailConfirmationError"
  | "emailConfirmed"
  | "kycInProgress"
  | "updateAddress"
  | "terms"
  | "admin"
  | "faq"
  | "updateAddressEmail"
  | "updateAddressAcknowledge"
  | ProjectsType;
export type ModalRoutesType = "unlock" | "account";

const projectsRoutes: any = {};
for (const project of allProjects) {
  const title = project.name
    .split("-")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
  projectsRoutes[project.name] = {
    path: `/${project.name}/:section`,
    title,
    component: Project,
  };
  projectsRoutes[`${project.name}-root`] = {
    path: `/${project.name}`,
    title,
    component: Project,
  };
}

export const backgroundRoutes: Record<BackgroundRoutesType, RouteType> = {
  home: {
    path: "/",
    title: "",
    component: Home,
  },
  home_route: {
    path: "/home",
    title: "",
    component: Home,
  },
  history: {
    path: "/history",
    title: "",
    component: History,
  },
  ...projectsRoutes,
  updateAddress: {
    path: "/update-address",
    title: "Update Address",
    component: UpdateAddress,
  },
  updateAddressEmail: {
    path: "/update-address-email",
    title: "Update Address Email",
    component: UpdateAddressEmail,
  },
  admin: {
    path: "/admin",
    title: "Admin",
    component: Admin,
  },
  updateAddressAcknowledge: {
    path: "/kyc-section/change-address/:token/*",
    title: "Update Address",
    component: UpdateAddressAcknowledge,
  },
};

export const modalRoutes: Record<ModalRoutesType, RouteType> = {
  unlock: {
    path: "/unlock",
    title: "Unlock",
    component: UnlockModal,
  },
  account: {
    path: "/account",
    title: "Account",
    component: () => {
      return (
        <ModalContainer title="Account details">
          <Account />
        </ModalContainer>
      );
    },
  },
};

export const backgroundRouteNames = Object.keys(backgroundRoutes).reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: backgroundRoutes[cur as BackgroundRoutesType].path,
  }),
  {} as Record<BackgroundRoutesType, string>,
);

export const modalRouteNames = Object.keys(modalRoutes).reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: modalRoutes[cur as ModalRoutesType].path,
  }),
  {} as Record<ModalRoutesType, string>,
);

export const foregoundRouteNames = {
  doesNotExist: "/fixesBug",
};

export const routeNames = {
  ...backgroundRouteNames,
  ...modalRouteNames,
  ...foregoundRouteNames,
};

const routes: RouteType[] = [
  ...Object.keys(modalRoutes).map((route) => {
    const { path, title, authenticatedRoute, component } =
      modalRoutes[route as ModalRoutesType];
    return { path, title, authenticatedRoute, component };
  }),

  ...Object.keys(backgroundRoutes).map((route) => {
    const { path, title, authenticatedRoute } =
      backgroundRoutes[route as BackgroundRoutesType];
    return {
      path,
      title,
      authenticatedRoute,
      component: () => null,
    };
  }),
];

const wrappedRoutes = () => {
  return routes.map((route) => {
    const title = route.title
      ? `${route.title} • Maiar Launchpad`
      : "Maiar • Launchpad";
    return {
      path: route.path,
      authenticatedRoute: route.authenticatedRoute,
      component: withPageTitle(
        title,
        route.component,
      ) as any as React.ComponentClass<any, any>,
    };
  });
};

export default wrappedRoutes();

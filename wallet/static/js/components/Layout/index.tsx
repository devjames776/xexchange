import React from "react";

import { AccessTokenManager } from "@elrondnetwork/dapp-core-internal";
import {
  useGetAccountInfo,
  useGetLoginInfo,
} from "@elrondnetwork/dapp-core/hooks";
import { AuthenticatedRoutesWrapper } from "@elrondnetwork/dapp-core/wrappers";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  currentProject as configProject,
  ProjectsEnum,
  ProjectsType,
  network,
} from "config";
import { useRefreshAccount, useMatchPath } from "helpers";
import { launchpadOriginSelector } from "redux/selectors";
import routes, { routeNames } from "routes";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TxSubmittedModal from "./TxSubmittedModal";
import useBgPage from "./useBgPage";

require("assets/styles/light.scss");

const Container = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useSelector(launchpadOriginSelector);
  const currentProject: ProjectsType = pathname.split("/")[1] as ProjectsType;

  const matchPath = useMatchPath();

  const isHome = pathname === routeNames.home || matchPath(routeNames.home);

  const isTerms = false;

  const isProjectPage =
    pathname === routeNames[configProject] ||
    matchPath(routeNames[configProject]) ||
    Object.values(ProjectsEnum).includes(currentProject as ProjectsEnum);

  const isUnlockPage =
    pathname === routeNames.unlock || matchPath(routeNames.unlock);

  const isAccountPage =
    pathname === routeNames.account || matchPath(routeNames.account);

  const ignoreFlexContainer =
    isHome || isProjectPage || isTerms || isUnlockPage || isAccountPage;

  const cssClass = ignoreFlexContainer
    ? ""
    : "container d-flex flex-column flex-grow-1 mb-spacer";

  return <div className={cssClass}>{children}</div>;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  useRefreshAccount();

  const { BgPage, hideBgPage } = useBgPage();

  const { loginMethod, tokenLogin } = useGetLoginInfo();
  const { address } = useGetAccountInfo();
  const location = useLocation();
  const { search, pathname } = location;

  const currentProject: ProjectsType = pathname.split("/")[1] as ProjectsType;
  const project =
    Object.values(ProjectsEnum).includes(currentProject as ProjectsEnum) &&
    currentProject
      ? currentProject
      : configProject;

  const loggedIn = Boolean(address);
  const props = {
    loginMethod,
    userAddress: address,
    loggedIn,
    tokenLogin,
    maiarIdApi: network.maiarIdApi,
  };

  return (
    <>
      <div className={`layout flex-fill ${project}`}>
        <Navbar />
        <Container>
          <main className="main-content d-flex flex-column">
            <>
              <AuthenticatedRoutesWrapper
                routes={routes}
                unlockRoute={`${routeNames.unlock}${search}`}
              >
                <AccessTokenManager {...props}>
                  {!hideBgPage && <>{BgPage}</>}
                  {children}
                  {loggedIn && (
                    <>
                      <TxSubmittedModal />
                    </>
                  )}
                </AccessTokenManager>
              </AuthenticatedRoutesWrapper>
            </>
          </main>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

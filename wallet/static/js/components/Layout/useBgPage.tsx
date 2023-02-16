import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useMatchPath } from "helpers";
import { launchpadOriginSelector } from "redux/selectors";
import { setLaunchpadOrigin } from "redux/slices";
import {
  backgroundRouteNames,
  backgroundRoutes,
  BackgroundRoutesType,
  foregoundRouteNames,
  modalRouteNames,
  routeNames,
} from "routes";

const useBgPage = () => {
  const matchPath = useMatchPath();
  const dispatch = useDispatch();

  const launchpadOrigin = useSelector(launchpadOriginSelector);
  const { pathname, search } = useLocation();
  const [lastOrigin, setLastOrigin] = React.useState("");
  const [BgPage, setBgPage] = React.useState<React.ReactNode>(() => null);

  const isForegroundRoute = () =>
    Object.values(foregoundRouteNames).some((path) => matchPath(path));

  const [hideBgPage, setHideBgPage] = React.useState<React.ReactNode>(
    isForegroundRoute(),
  );

  const setOrigin = (path: string) => {
    dispatch(
      setLaunchpadOrigin({
        pathname: path,
        search: /^\?[A-Za-z0-9=&]+$/.test(search) ? search : "",
      }),
    );
    setLastOrigin(path);
  };

  const setlaunchpadOrigin = () => {
    const foundBgPath = Object.values(backgroundRouteNames).find((path) =>
      matchPath(path),
    );

    const isModalPath = Object.values(modalRouteNames).some((path) =>
      matchPath(path),
    );

    if (foundBgPath && foundBgPath !== launchpadOrigin.pathname) {
      setOrigin(pathname);
    }

    setHideBgPage(isForegroundRoute() || (!foundBgPath && !isModalPath));

    return () => {
      if (foundBgPath || lastOrigin) {
        let newPathname = pathname || lastOrigin;
        newPathname = pathname === routeNames.unlock ? lastOrigin : newPathname;
        dispatch(
          setLaunchpadOrigin({
            pathname: newPathname,
            search: /^\?[A-Za-z0-9=]+$/.test(search) ? search : "",
          }),
        );
      }
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(setlaunchpadOrigin, [pathname, search, lastOrigin]);

  const setLaunchpadBackground = () => {
    const found = Object.entries(backgroundRouteNames).find(
      ([, path]) => launchpadOrigin.pathname === path || matchPath(path),
    );

    if (found) {
      const [routeName] = found;
      const ComponentRoute =
        backgroundRoutes[routeName as BackgroundRoutesType];
      const Component = ComponentRoute.component;
      setBgPage(() => <Component />);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(setLaunchpadBackground, [launchpadOrigin.pathname]);

  return { BgPage, hideBgPage };
};

export default useBgPage;

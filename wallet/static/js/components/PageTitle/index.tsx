import React, { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useMatchPath } from "helpers";
import { launchpadOriginSelector } from "redux/selectors";

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const matchPath = useMatchPath();
  const { state } = useLocation();
  const launchpadOrigin = useSelector(launchpadOriginSelector);
  const from = state && "from" in (state as any) ? (state as any).from : "";

  const blacklist: string[] = [launchpadOrigin.pathname];
  const scrollTop = () => {
    const preventScroll = blacklist.some(
      (page) => matchPath(page) || from === page,
    );
    if (!preventScroll) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    }
  };

  useEffect(scrollTop, []);

  return <>{children}</>;
};

const withPageTitle = (title: string, Component: React.ComponentType) => () => {
  const Memoized = memo(() => (
    <ScrollToTop>
      <Component />
    </ScrollToTop>
  ));

  useEffect(() => {
    document.title = title;
  }, []);
  return <Memoized />;
};

export default withPageTitle;

import { matchPath, useLocation } from "react-router-dom";

const useMatchPath = () => {
  const { pathname } = useLocation();

  return (path: string) =>
    matchPath(
      {
        path,
      },
      pathname,
    ) !== null;
};

export default useMatchPath;

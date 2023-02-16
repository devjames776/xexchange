import * as React from "react";
import { Link } from "react-router-dom";
import { routeNames } from "routes";
import { ReactComponent as ElrondLogo } from "../../assets/images/logo.svg";
import { ReactComponent as ElrondSymbol } from "../../assets/images/symbol.svg";

const Logo = () => {
  return (
    <Link
      className="d-flex align-items-center navbar-brand mr-0"
      to={routeNames.home}
    >
      <ElrondLogo className="main-logo flex-shrink-0 d-none d-xl-block" />
      <ElrondSymbol className="main-symbol flex-shrink-0 d-xl-none" />
      <span
        className="text-secondary text-truncate"
        style={{ paddingBottom: "2px" }}
      >
        Launchpad
      </span>
    </Link>
  );
};

export default Logo;

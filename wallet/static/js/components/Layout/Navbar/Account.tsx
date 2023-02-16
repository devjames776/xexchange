import React from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { Trim } from "@elrondnetwork/dapp-core/UI";

import { faUserCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { routeNames } from "routes";

const Account = () => {
  const { address } = useGetAccountInfo();

  return (
    <Link
      className="btn btn-primary btn-sm ml-2 d-flex flex-row align-items-center"
      to={routeNames.account}
    >
      <FontAwesomeIcon icon={faUserCircle} size="lg" />
      <div className="navbar-address ml-2 d-none d-lg-block">
        <Trim text={address} />
      </div>
    </Link>
  );
};

export default Account;

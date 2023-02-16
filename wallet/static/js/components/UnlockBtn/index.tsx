import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as Lightning } from "assets/images/lightning.svg";
import { routeNames } from "routes";

const UnlockBtn = ({
  "data-testid": dataTestId,
  className,
  text,
  large,
}: {
  "data-testid"?: string;
  className?: string;
  text?: string;
  large?: boolean;
}) => {
  const unlockRoute = `${routeNames.unlock}?callbackUrl=${window.location.href}`;

  const { pathname } = useLocation();

  if (pathname === routeNames.updateAddress) return <></>;
  return (
    <Link
      className={`unlock-btn btn btn-primary my-2 ${
        className ? className : ""
      } ${large ? "btn-lg" : "btn-sm"}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      to={unlockRoute}
      data-testid={dataTestId}
    >
      <div className="d-flex align-items-center justify-content-center">
        <Lightning
          className="mr-2"
          style={
            large
              ? { width: "1.3rem", height: "1.3rem" }
              : { width: "0.9rem", height: "0.9rem" }
          }
        />
        {text ? text : "Connect"}
      </div>
    </Link>
  );
};

export default UnlockBtn;

import React from "react";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import PageState from "../PageState";

const Loader = ({
  dataTestId = "loader",
  noText = false,
  title = "Loading...",
  containerClass = "",
}: {
  dataTestId?: string;
  noText?: boolean;
  title?: string;
  containerClass?: string;
}) => {
  return (
    <PageState
      title={noText ? "" : title}
      iconClass="text-primary fa-spin"
      dataTestId={dataTestId}
      icon={faCircleNotch}
      containerClass={containerClass}
    />
  );
};
export default Loader;

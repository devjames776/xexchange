import * as React from "react";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import { useLocation } from "react-router-dom";
import PageState from "components/PageState";

const PageNotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="pb-spacer d-flex align-items-center justify-content-center my-auto">
      <PageState
        icon={faTimes}
        title="Page not found"
        containerClass="card shadow mb-spacer"
        description={
          <div className="px-spacer">
            <span className="text-break-all">{pathname}</span>
          </div>
        }
      />
    </div>
  );
};

export default PageNotFound;

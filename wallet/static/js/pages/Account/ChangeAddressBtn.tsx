import React from "react";

import { useNavigate } from "react-router-dom";
import { routeNames } from "routes";

const ChangeAddressBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="w-50 p-1">
      <button
        {...{ target: "_blank" }}
        onClick={(e: any) => {
          e.preventDefault();
          navigate(routeNames.updateAddressEmail);
        }}
        className="btn btn-sm btn-outline-primary btn-block mx-2 mt-3"
      >
        Change Address
      </button>
    </div>
  );
};

export default ChangeAddressBtn;

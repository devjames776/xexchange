import React, { useEffect, useState } from "react";
import { useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks";
import { faExclamation, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useMatch, useNavigate, useParams } from "react-router-dom";
import { PageState } from "components";
import useLogout from "components/Layout/Navbar/useLogout";
import { currentProject } from "config";
import { useApiRequests } from "helpers";
import { setUpdateAccountAddressToken } from "redux/slices";
import { routeNames } from "routes";

const UpdateAddressAcknowledge = () => {
  // const { getUpdateAccountAddressToken } = useApiRequests();
  const logout = useLogout();
  // const dispatch = useDispatch();
  const match = useMatch(routeNames.updateAddressAcknowledge);
  const navigate = useNavigate();
  const { isLoggedIn } = useGetLoginInfo();

  useEffect(() => {
    if (!match?.params.token) return;
    localStorage.setItem("updateAddressToken", match?.params.token);
    if (isLoggedIn) {
      logout(
        `${window.location.origin}${routeNames.updateAddress}`,
        routeNames.updateAddress,
      );
    } else {
      navigate(routeNames.updateAddress);
    }
  }, [isLoggedIn]);

  if (!match?.params.token)
    return (
      <PageState
        icon={faTimes}
        iconClass="text-danger"
        iconBgClass="p-4 rounded-bg-circle bg-danger-opaque"
        iconSize="3x"
        title="Confirmation token was not found"
      />
    );

  // const changeAddressClicked = async () => {
  //   const result = await getUpdateAccountAddressToken();
  //   if (result.success) {
  //     dispatch(setUpdateAccountAddressToken(result.data.token));

  //     logout(
  //       `${window.location.origin}${routeNames.updateAddress}`,
  //       routeNames.updateAddress,
  //     );

  //     localStorage.setItem("updateAddressToken", result.data.token);
  //   } else {
  //     return;
  //   }
  // };

  // return (
  //   <div className="d-flex justify-content-center my-auto kyc-step">
  //     <div className="card">
  //       <PageState
  //         icon={faExclamation}
  //         iconClass="text-warning"
  //         iconBgClass="p-4 rounded-bg-circle bg-success-opaque"
  //         iconSize="3x"
  //         title="Change address confirmation"
  //         description="Changing the address associated with your account triggers a KYC re-evaluation."
  //         action={
  //           <>
  //             <div className="d-flex justify-content-center">
  //               <Link
  //                 className="btn btn-outline-primary "
  //                 style={{ width: "100px", marginRight: "5px" }}
  //                 to={`/${currentProject}/metrics`}
  //               >
  //                 Back
  //               </Link>

  //               <Button
  //                 className="btn btn-primary "
  //                 style={{ width: "100px", marginLeft: "5px" }}
  //                 onClick={changeAddressClicked}
  //               >
  //                 Continue
  //               </Button>
  //             </div>
  //           </>
  //         }
  //       />
  //     </div>
  //   </div>
  // );
};

export default UpdateAddressAcknowledge;

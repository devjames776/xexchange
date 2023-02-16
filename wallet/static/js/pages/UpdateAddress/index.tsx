import React, { useEffect, useState } from "react";
import { hooks } from "@elrondnetwork/dapp-core-internal";
import { useGetIsAuthenticated } from "@elrondnetwork/dapp-core-internal/dist/hooks";
import { useKycAccount, useRefreshAccount } from "@elrondnetwork/dapp-core-kyc";
import {
  KycStatusStringEnum,
  KYC_ROUTES,
} from "@elrondnetwork/dapp-core-kyc/constantsCollection";
import {
  useGetAccountInfo,
  useGetLoginInfo,
} from "@elrondnetwork/dapp-core/hooks";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { PageState } from "components";
import StepperPageState from "components/StepperPageState";
import { currentProject, network } from "config";
import { useApiRequests } from "helpers";
import Unlock from "pages/Unlock";

const UpdateAddress = () => {
  const { address } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();
  const token = localStorage.getItem("updateAddressToken");
  const { refreshAccount } = useRefreshAccount();
  let tokenPayload: any;
  if (token) {
    tokenPayload = jwtDecode(token);
  }

  const { accessToken } = hooks.useGetIsAuthenticated(
    address,
    network.maiarIdApi,
  );

  useEffect(() => {
    if (
      isLoggedIn &&
      token &&
      tokenPayload &&
      accessToken &&
      address !== tokenPayload.address
    ) {
      localStorage.removeItem("updateAddressToken");
      changeAddress(token);
    }
  }, [isLoggedIn, accessToken]);

  const { updateAccountAddress } = useApiRequests();
  const [addressChanged, setAddressChanged] = useState(false);
  const navigate = useNavigate();
  const { kycStatusStr } = useKycAccount();

  const changeAddress = async (newToken: string) => {
    const result = await updateAccountAddress(newToken);
    if (result.success) {
      setAddressChanged(true);
      refreshAccount();
      return;
    }
  };

  if (
    addressChanged ||
    kycStatusStr === KycStatusStringEnum.identityValidationRequired ||
    kycStatusStr === KycStatusStringEnum.identityValidationInProgress
  )
    return (
      <div className="d-flex justify-content-center my-auto kyc-step">
        <div className="card" style={{ padding: "20px", maxWidth: "500px" }}>
          <StepperPageState
            currentStep={4}
            totalSteps={5}
            iconClass="text-success"
            iconBgClass="icon-state medium bg-success-opaque"
            title="Change wallet address"
            subTitle="Identity confirmation"
            action={
              <>
                <div>
                  <p>
                    Proceed with the video identification to complete your
                    wallet address change request.
                  </p>
                </div>
                <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between mx-4">
                  <button
                    className="btn btn-sm btn-primary btn-block mx-2 mt-3"
                    onClick={() => {
                      navigate(KYC_ROUTES.identityVerification.path);
                    }}
                  >
                    Confirm Identity
                  </button>
                </div>
              </>
            }
          />
        </div>
      </div>
    );
  if (!isLoggedIn && tokenPayload) {
    return (
      <div className="d-flex justify-content-center my-auto kyc-step">
        <div className="card" style={{ padding: "20px", maxWidth: "500px" }}>
          <StepperPageState
            currentStep={3}
            totalSteps={5}
            iconClass="text-success"
            iconBgClass="icon-state medium bg-success-opaque"
            title="Change wallet address"
            subTitle="Connect with the new wallet."
            action={
              <>
                <div>
                  <Unlock plainForm={true} tutorialInfo={true} />
                </div>
              </>
            }
          />
        </div>
      </div>
    );
  }

  return <></>;
};

export default UpdateAddress;

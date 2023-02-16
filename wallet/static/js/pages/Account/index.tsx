import React, { useState } from "react";
import { useKycAccount } from "@elrondnetwork/dapp-core-kyc";
import { KycStatusStringEnum } from "@elrondnetwork/dapp-core-kyc/constantsCollection";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { Trim } from "@elrondnetwork/dapp-core/UI";
import { Navigate } from "react-router-dom";
import { CopyButton } from "components";
import useLogout from "components/Layout/Navbar/useLogout";
import { kycEnd } from "config";
import { routeNames } from "routes";
import ChangeAddressBtn from "./ChangeAddressBtn";
import SignupStatus from "./SignupStatus";

const Account = () => {
  const { address } = useGetAccountInfo();
  const logout = useLogout();
  const loggedIn = Boolean(address);

  const { kycAccount, kycStatusStr } = useKycAccount();
  const onDisconnectClick = () => {
    logout(`${window.location.origin}${routeNames.home}`, routeNames.home);
  };

  if (!loggedIn) {
    return <Navigate to={routeNames.unlock} />;
  }

  return (
    <div className="account">
      <div className="d-flex flex-wrap justify-content-between mb-2">
        <label className="text-secondary mb-0">Your wallet</label>
      </div>

      <div className="address-holder-container d-flex flex-row justify-content-between align-items-center border rounded px-3 py-2 mb-spacer">
        <div className="address-holder trim-fs-sm text-primary">
          <Trim text={address} />
        </div>
        <div className="border-left ml-3 pl-3 text-secondary">
          <CopyButton text={address} className="align-end-flex" />
        </div>
      </div>
      <div className="kyc-section text-secondary d-flex flex-wrap flex-column w-100">
        <span className="mr-1 text-left">KYC Status</span>
        <SignupStatus />
      </div>

      <div className="border-top mx-n4 pt-3 mt-5">
        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between mx-4">
          {loggedIn &&
          !kycEnd &&
          kycAccount &&
          kycAccount.email &&
          kycAccount.emailConfirmed &&
          kycStatusStr === KycStatusStringEnum.validated ? (
            <>
              <ChangeAddressBtn />
              <div className="w-50 p-1">
                <button
                  className="btn btn-sm btn-primary btn-block mx-2 mt-3"
                  onClick={onDisconnectClick}
                >
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <div className="w-100 p-1">
              <button
                className="btn btn-sm btn-primary btn-block mx-2 mt-3"
                onClick={onDisconnectClick}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;

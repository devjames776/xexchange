import * as React from "react";
import { useKycAccount } from "@elrondnetwork/dapp-core-kyc";
import {
  KycStatusStringEnum,
  KYC_ROUTES,
} from "@elrondnetwork/dapp-core-kyc/constantsCollection";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { kycEnd } from "config";
import ProceedKycBtn from "pages/signup/EmailConfirmed/ProceedKycBtn";
import susAccounts from "susRejected";

const SignupStatus = (): any => {
  const [isAccountSuspicious, setIsAccountSuspicious] = React.useState(false);
  const { address } = useGetAccountInfo();
  const navigate = useNavigate();
  React.useEffect(() => {
    for (const susAccount of susAccounts) {
      if (susAccount.address === address) {
        setIsAccountSuspicious(true);
        return;
      }
    }
  }, [address]);

  const { kycStatusStr } = useKycAccount();

  switch (kycStatusStr) {
    case KycStatusStringEnum.notStarted:
      return (
        <div className="signup-status d-flex align-items-center justify-content-between flex-fill">
          <strong className="text-dark">Not Started</strong>
          {!kycEnd && <ProceedKycBtn />}
        </div>
      );
    case KycStatusStringEnum.inProgress:
      return (
        <div className="signup-status d-flex align-items-center justify-content-between flex-fill">
          {!kycEnd ? (
            <strong className="text-dark">In Progress</strong>
          ) : (
            <strong className="text-dark">Not completed</strong>
          )}

          {!kycEnd && <ProceedKycBtn />}
        </div>
      );
    case KycStatusStringEnum.awaitVerification:
      return (
        <>
          <strong className="text-dark">
            User actions complete, provider verification can take up to 72
            hours!
          </strong>{" "}
          <br />
        </>
      );
    case KycStatusStringEnum.rejected:
      return (
        <div className="signup-status d-flex align-items-center justify-content-between flex-fill">
          <strong className="text-dark">Rejected</strong>
          {!kycEnd && <ProceedKycBtn />}
        </div>
      );
    case KycStatusStringEnum.finalRejected:
      return (
        <div className="signup-status d-flex align-items-center justify-content-between flex-fill">
          <strong className="text-dark">
            Rejected - not able to re-submit
          </strong>
        </div>
      );

    case KycStatusStringEnum.validated: {
      if (isAccountSuspicious)
        return (
          <strong className="text-dark">
            Account rejected due to suspicious activity
          </strong>
        );
      return <strong className="text-dark">Verified</strong>;
    }

    case KycStatusStringEnum.identityValidationRequired:
      return (
        <div className="signup-status d-flex align-items-center justify-content-between flex-fill">
          <strong className="text-dark">Identity Validation Required</strong>
          {!kycEnd && (
            <Button
              onClick={() => {
                navigate(KYC_ROUTES.identityVerification.path);
              }}
              variant="primary"
              size="sm"
            >
              Confirm Identity
            </Button>
          )}
        </div>
      );

    case KycStatusStringEnum.identityValidationInProgress:
      return (
        <div className="signup-status d-flex align-items-center justify-content-between flex-fill">
          <strong className="text-dark">Identity Validation In Progress</strong>
        </div>
      );

    default: {
      return null;
    }
  }
};

export default SignupStatus;

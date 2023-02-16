import React, { useEffect, useState } from "react";
import { useChangeAddress } from "@elrondnetwork/dapp-core-kyc";
import {
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { PageState } from "components";
import StepperPageState from "components/StepperPageState";
import { routeNames } from "routes";
const RETRY_TIMEOUT = 60;

const UpdateAddressEmail = () => {
  const { initChangeAddress } = useChangeAddress();
  const [emailSent, SetEmailSent] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const [retryDisabled, setRetrydDisabled] = useState(false);
  const [retryDisabledSecondsLeft, setRetryDisabledSecondsLeft] = useState(0);

  const changeAddressClicked = async () => {
    const targetTime = moment.utc().add(RETRY_TIMEOUT, "seconds");
    localStorage.setItem(
      "retryAddressChangeDisabledExpiration",
      targetTime.toString(),
    );

    try {
      await initChangeAddress();
      SetEmailSent(true);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (retryDisabledSecondsLeft >= 0) {
      const now = moment.utc();
      const targetTime = moment.utc(
        localStorage.getItem("retryAddressChangeDisabledExpiration"),
      );
      const secondsLeft = targetTime.diff(now, "seconds").toString();
      if (parseInt(secondsLeft) > 0) {
        setRetrydDisabled(true);
        setTimeout(() => {
          setRetryDisabledSecondsLeft(parseInt(secondsLeft) - 1);
        }, 1000);
      } else {
        setRetrydDisabled(false);
      }
    }
  });

  if (retryDisabled || emailSent) {
    return (
      <div className="d-flex justify-content-center my-auto kyc-step">
        <div className="card" style={{ padding: "20px", maxWidth: "500px" }}>
          <StepperPageState
            icon={faEnvelope as any}
            currentStep={2}
            totalSteps={5}
            iconClass="text-primary"
            iconBgClass="icon-state medium bg-primary-opaque"
            title="Change wallet address"
            subTitle="Change wallet address email confirmation"
            action={
              <>
                <div>
                  <p>
                    Click the confirmation link you received in the email
                    address used when you created your account.
                  </p>
                </div>
                <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between mx-4">
                  <button
                    disabled={retryDisabled}
                    className="btn btn-sm btn-white btn-block mx-2 mt-3"
                    onClick={() => {
                      navigate(routeNames.home);
                    }}
                  >
                    Resend Mail{" "}
                    {retryDisabledSecondsLeft !== 0 &&
                      `( ${moment
                        .utc(
                          moment
                            .duration(retryDisabledSecondsLeft, "seconds")
                            .asMilliseconds(),
                        )
                        .format("mm:ss")} )`}
                  </button>
                  <button
                    className="btn btn-sm btn-primary btn-block mx-2 mt-3"
                    onClick={() => {
                      navigate(routeNames.home);
                    }}
                  >
                    Continue
                  </button>
                </div>
              </>
            }
          />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <PageState
        icon={faTimes as any}
        iconClass="text-danger"
        iconBgClass="icon-state medium bg-danger-opaque"
        title="Something went wrong"
        description="Something went wrong, please try again later."
      />
    );
  }

  return (
    <div className="d-flex justify-content-center my-auto kyc-step">
      <div className="card" style={{ padding: "20px", maxWidth: "500px" }}>
        <StepperPageState
          icon={faExclamationTriangle as any}
          currentStep={1}
          totalSteps={5}
          iconClass="text-warning"
          iconBgClass="icon-state medium bg-warning-opaque"
          title="Change wallet address"
          subTitle="Before you begin please note:"
          action={
            <>
              <div>
                <p>
                  A video identification will be performed in order to allow for
                  the address change.
                </p>
                <p>
                  Also, once the change address process is started there is no
                  way to cancel or undo the wallet change.
                </p>
              </div>
              <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between mx-4">
                <button
                  className="btn btn-sm btn-white btn-block mx-2 mt-3"
                  onClick={() => {
                    navigate(routeNames.home);
                  }}
                >
                  Back
                </button>
                <button
                  className="btn btn-sm btn-primary btn-block mx-2 mt-3"
                  onClick={changeAddressClicked}
                >
                  Continue
                </button>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default UpdateAddressEmail;

import React from "react";
import CountDown, { CountdownStyle } from "components/Countdown";
import { kycEnd } from "config";
import SignupStatus from "pages/Account/SignupStatus";

const SnapshotCountdown = ({ endDate }: { endDate: string }) => {
  return (
    <div className="snapshot-countdown text-center text-secondary pt-spacer px-spacer">
      <div className="pb-2">
        <h5 className="mb-0">
          Contract setup in progress. <br /> <br />
        </h5>
        <div>
          Users with verified KYC will be able to purchase lottery tickets in:
        </div>
        <CountDown
          className={CountdownStyle.CONTRACT_STATUS}
          utcDate={endDate}
        />

        <div className="border-top pt-spacer px-3 mx-n3">
          <>
            <div className="d-flex flex-column justify-content-center mb-2 text-secondary kyc-section">
              <div>KYC Status</div>
              <SignupStatus />
            </div>
          </>
        </div>
      </div>
      {/* <div className="border-top pt-spacer mx-nspacer"></div>
      <div className="small">
        <h6 className="mb-spacer">Current Eligible Tier</h6>
        <p>
          You are currently meeting the criteria for <br />
          <strong className="text-dark">tier 1 (1 ticket).</strong>
        </p>
        <p>
          Stake 12 more EGLD to qualify for <br />
          <strong className="text-dark"> tier 2 (5 tickets).</strong>
        </p>
      </div> */}
    </div>
  );
};

export default SnapshotCountdown;

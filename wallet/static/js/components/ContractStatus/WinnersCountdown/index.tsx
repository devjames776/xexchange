import React, { useEffect, useState } from "react";
import { useKycAccount } from "@elrondnetwork/dapp-core-kyc";
import { KycStatusStringEnum } from "@elrondnetwork/dapp-core-kyc/constantsCollection";
import {
  useGetActiveTransactionsStatus,
  useGetAccountInfo,
} from "@elrondnetwork/dapp-core/hooks";
import { SendTransactionReturnType } from "@elrondnetwork/dapp-core/types";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ClaimModal from "components/ClaimModal";
import CountDown, { CountdownStyle } from "components/Countdown";
import { TierType } from "config";
import { updateRefetch } from "redux/slices";
import susAccounts from "susRejected";
import { useGetTier } from "../helpers/useGetTiers";

const WinnersCountdown = ({
  endDate,
  ticketsData,
  setTxSessionId,
}: {
  endDate: string;
  ticketsData: any;
  setTxSessionId: (sessionId: SendTransactionReturnType) => void;
}) => {
  const [tier, setTier] = useState<TierType>();
  const [showModal, setShowModal] = React.useState(false);
  const { getTierByStakedAmoutn } = useGetTier();
  const [claimDisabled, setClaimDisabled] = useState(false);
  const dispatch = useDispatch();
  const [isAccountSuspicious, setIsAccountSuspicious] = React.useState(false);
  const { address } = useGetAccountInfo();
  const { kycStatusStr } = useKycAccount();
  React.useEffect(() => {
    for (const susAccount of susAccounts) {
      if (susAccount.address === address) {
        setIsAccountSuspicious(true);
        return;
      }
    }
  }, [address]);

  useEffect(() => {
    getTierData();
  }, [ticketsData]);

  const activeTransactions = useGetActiveTransactionsStatus();

  const [shouldRefetch, setShouldRefetch] = useState(false);
  useEffect(() => {
    if (activeTransactions) {
      if (shouldRefetch && !activeTransactions.pending) {
        setTimeout(() => {
          dispatch(updateRefetch());
        }, 1500);
        setShouldRefetch(false);
      }
      setClaimDisabled(activeTransactions.pending);
    }
  }, [activeTransactions]);

  useEffect(() => {
    if (activeTransactions?.pending) {
      setShouldRefetch(true);
    }
  });

  const getTierData = async () => {
    const tier = await getTierByStakedAmoutn();
    setTier(tier);
  };

  const getTicketEntriesIds = (ticketEntries: Array<string>): Array<string> => {
    const tickets: Array<string> = [];
    if (!ticketEntries[0] || !ticketEntries[ticketEntries.length - 1])
      return [];
    let from = parseInt(ticketEntries[0]);
    const to = parseInt(ticketEntries[ticketEntries.length - 1]);
    for (from; from <= to; from++) {
      tickets.push(from.toString());
    }
    return tickets;
  };

  const getUnconfirmedTickets = (
    ticketEntries: Array<string>,
  ): Array<string> => {
    const resp = getTicketEntriesIds(ticketEntries);

    if (!ticketsData?.numConfirmedTickets) ticketsData.numConfirmedTickets = 0;

    return resp.splice(
      0,
      resp.length - parseInt(ticketsData.numConfirmedTickets),
    );
  };

  return (
    <div className="winners-countdown text-center text-secondary p-spacer">
      <div className="pb-2">
        <h5 className="mb-0">Buying tickets ends in: </h5>
        <CountDown
          className={CountdownStyle.CONTRACT_STATUS}
          utcDate={endDate}
        />
      </div>

      {tier && kycStatusStr === KycStatusStringEnum.validated && (
        <>
          <div className="border-top pt-spacer mx-nspacer"></div>
          <div className="pb-spacer">
            <h6 className="mb-spacer">
              You qualify for{" "}
              <strong>
                {tier.number}
                {tier.suffix} tier
              </strong>
            </h6>
            <p className="mb-0 small">
              <strong className="text-dark">
                {tier.number}
                {tier.suffix} tier
              </strong>{" "}
              gives{" "}
              <strong className="text-dark">
                {ticketsData.ticketEntries.length} tickets
              </strong>{" "}
              in the Elrond Launchpad Lottery.
            </p>
          </div>
        </>
      )}

      {ticketsData && (
        <div className=" mb-3">
          {ticketsData.ticketEntries.length === 0 ? (
            <>
              <div className="icon-state medium bg-danger-opaque mx-auto mb-3">
                <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
              </div>
              <h5 className="mb-0 ">
                You are not eligible to buy tickets.{" "}
                {kycStatusStr === KycStatusStringEnum.validated ? (
                  <>
                    {isAccountSuspicious ? (
                      <>Account rejected due to suspicious activity</>
                    ) : (
                      <>
                        <br />
                        You did not have staked EGLD when the snapshot was done.
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <br />
                    Your KYC was not accepted.
                  </>
                )}
              </h5>
            </>
          ) : (
            <>
              {ticketsData.numConfirmedTickets !== 0 && (
                <div className="text-left">
                  <h6 className="mb-0 small">
                    You have purchased{" "}
                    <strong>{ticketsData.numConfirmedTickets}</strong> out of{" "}
                    {getTicketEntriesIds(ticketsData.ticketEntries).length} ASH
                    token tickets.
                  </h6>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {ticketsData &&
        ticketsData.ticketEntries.length !== 0 &&
        parseInt(ticketsData.numConfirmedTickets) <
          getTicketEntriesIds(ticketsData.ticketEntries).length &&
        ticketsData.ticketEntries.length !== 0 && (
          <>
            <Button
              variant="primary"
              size="lg"
              disabled={claimDisabled}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Participate Now
            </Button>
          </>
        )}

      {showModal && ticketsData && (
        <ClaimModal
          showModal={showModal}
          setTxSessionId={setTxSessionId}
          winningTicketsIds={getUnconfirmedTickets(ticketsData.ticketEntries)}
          numConfirmedTickets={ticketsData.numConfirmedTickets}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default WinnersCountdown;

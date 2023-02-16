import * as React from "react";
import { useKycAccount } from "@elrondnetwork/dapp-core-kyc";
import { KycTypeEnum } from "@elrondnetwork/dapp-core-kyc/types";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/pro-regular-svg-icons/faTimes";
import { faCrown } from "@fortawesome/pro-solid-svg-icons/faCrown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";

import { UnlockBtn, Table, AdditionalContent, Image } from "components";
import { useGetTier } from "components/ContractStatus/helpers/useGetTiers";
import Snapshots from "components/Snapshots";
import { TierType, currentProject, kycEnd } from "config";
import { getIcon, useApiRequests } from "helpers";
import { defaultFaqLink } from "helpers/interface/getProjectPages";
import SignupStatus from "pages/Account/SignupStatus";
import { routeNames } from "routes";

enum RESTRICTED_COUNTRIES {
  turkey = "TR",
  philipines = "PH",
}

const ProjectAnnouncement = ({ data }: { data: any }) => {
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);
  const [showModal, setShowModal] = React.useState(false);
  const [currentModal, setCurrentModal] = React.useState("");

  const { getTierByStakedAmoutn } = useGetTier();
  const [tier, setTier] = React.useState<TierType | undefined>();
  const [geoCode, setGeoCode] = React.useState<string>("");
  const { getGeoCode } = useApiRequests();

  const { kycType } = useKycAccount();

  const toggleModal =
    (show: boolean, current: string) => (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
      }
      setShowModal(show);
      setCurrentModal(current);
    };

  React.useEffect(() => {
    if (loggedIn) fetchTier();
  }, [loggedIn]);

  const fetchTier = async () => {
    const geoCodeResponse = await getGeoCode();
    if (geoCodeResponse.success) {
      setGeoCode(geoCodeResponse.data.country);
    }
    setTier(await getTierByStakedAmoutn());
  };

  const getTicketsN = (ticketsNumber: number) => {
    if (
      (geoCode && geoCode === RESTRICTED_COUNTRIES.turkey) ||
      geoCode === RESTRICTED_COUNTRIES.philipines ||
      kycType === KycTypeEnum.limited
    ) {
      if (ticketsNumber > 20) return 20;
    }
    return ticketsNumber;
  };

  const hasFaq = data.faq.length > 0;
  const announcement = data.announcement;

  return (
    <>
      {announcement?.content?.image && (
        <Image
          data={announcement.content.image}
          className="p-1"
          rounded={true}
        />
      )}
      <div className="p-3 pt-spacer text-center">
        {announcement?.content?.description && (
          <div className="description">
            <ReactMarkdown linkTarget="_blank">
              {announcement.content.description}
            </ReactMarkdown>
          </div>
        )}
        {tier ? (
          <div className="mt-5 border border-primary rounded d-flex flex-column shadow-sm mb-n3">
            <div className="bg-primary p-3 rounded-top">
              <h6 className="mb-0 text-white">
                You qualify for{" "}
                <strong>
                  {tier.number}
                  {tier.suffix} tier
                </strong>
                <FontAwesomeIcon icon={faCrown} className="ml-3" />
              </h6>
            </div>
            <div className="p-3 text-secondary">
              <p className="small mb-0">
                This tier gives you{" "}
                <strong className="text-body">
                  {getTicketsN(tier.tickets)} Tickets
                </strong>{" "}
                in the Elrond Launchpad Lottery.
              </p>
              {/* {tier.egldNextTier > 0 && (
                <p className="small mt-3 mb-0">
                  <strong className="text-primary">
                    Stake {tier.egldNextTier} more EGLD
                  </strong>{" "}
                  to qualify for next tier
                </p>
              )} */}
            </div>
          </div>
        ) : (
          <>
            {loggedIn && (
              <div className="mt-5 border border-primary rounded d-flex flex-column shadow-sm mb-n3">
                <div className="bg-primary p-3 rounded-top">
                  <h6 className="mb-0 text-white">
                    You are not qualified for any tiers.
                  </h6>
                </div>
                <div className="p-3 text-secondary">
                  <p className="small mb-0">
                    Stake EGLD to qualify for one of the 5 tiers
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* {loggedIn && (
          <div className="font-weight-bold smaller mt-4 mb-n4">
            The next balance update will happen during the night - if your
            balance is not yet reflected within your account and wish to KYC for
            a higher tier, you will have to wait until the update is live.
          </div>
        )} */}

        {announcement?.modal && geoCode !== RESTRICTED_COUNTRIES.turkey && (
          <button
            type="button"
            className="btn btn-white btn-lg btn-block shadow-sm mt-spacer mb-3"
            onClick={toggleModal(true, "tiers")}
          >
            {announcement?.modal?.btnIcon && (
              <FontAwesomeIcon
                icon={getIcon(announcement.modal.btnIcon)}
                className="mr-2"
              />
            )}

            {announcement?.modal?.btnText}
          </button>
        )}
        <button
          type="button"
          className="btn btn-white btn-lg btn-block shadow-sm my-3"
          onClick={toggleModal(true, "snapshots")}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          Snapshots
        </button>
        {hasFaq && (
          <Link
            data-testid="kycGuideLink"
            className="btn btn-white btn-lg btn-block shadow-sm mt-3 mb-spacer"
            to={generatePath(routeNames[currentProject], {
              section: defaultFaqLink,
            })}
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
            KYC Guide
          </Link>
        )}
        <div className="border-top pt-spacer px-3 mx-n3">
          {loggedIn ? (
            <>
              <div className="d-flex flex-column justify-content-center mb-2 text-secondary kyc-section">
                <div>KYC Status</div>
                <SignupStatus />
              </div>
            </>
          ) : (
            <div className="text-center">
              <h6 className="mb-3">Register Now</h6>
              <UnlockBtn large={true} className="btn-block" />
            </div>
          )}
        </div>
      </div>

      {showModal && currentModal === "snapshots" && (
        <Modal
          show={showModal}
          backdrop={true}
          onHide={toggleModal(false, "")}
          className={`modal-container ${currentProject}`}
          animation={false}
          centered={true}
        >
          <div className="card w-100 announcement-modal snapshots-modal">
            <div className="card-header mb-0 pt-spacer pb-0 border-bottom-0">
              <div className="h5 mb-0 d-flex justify-content-between align-items-center">
                <div>Snapshots</div>
                <button
                  type="button"
                  className="btn btn-close"
                  onClick={toggleModal(false, "")}
                >
                  <FontAwesomeIcon
                    size="xs"
                    icon={faTimes}
                    className="text-body"
                  />
                </button>
              </div>
            </div>
            <div className="card-body mb-3">
              <Snapshots />
            </div>
          </div>
        </Modal>
      )}

      {announcement?.modal && showModal && currentModal === "tiers" && (
        <Modal
          show={showModal}
          backdrop={true}
          onHide={toggleModal(false, "")}
          className={`modal-container ${currentProject}`}
          animation={false}
          centered
        >
          <div className="card w-100 announcement-modal tiers-modal">
            <div className="card-header mb-0 pt-spacer pb-0 border-bottom-0">
              <div className="h5 mb-0 d-flex justify-content-between align-items-center">
                <div>{announcement?.modal?.title}</div>
                <button
                  type="button"
                  className="btn btn-close"
                  onClick={toggleModal(false, "")}
                >
                  <FontAwesomeIcon
                    size="xs"
                    icon={faTimes}
                    className="text-body"
                  />
                </button>
              </div>
            </div>
            <div className="card-body mb-3">
              {announcement?.modal?.table && (
                <Table table={announcement.modal.table} />
              )}
              <AdditionalContent content={announcement?.modal} />
              {announcement?.modal?.description && (
                <div className="mt-spacer description text-center">
                  <ReactMarkdown linkTarget="_blank">
                    {announcement.modal.description}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProjectAnnouncement;

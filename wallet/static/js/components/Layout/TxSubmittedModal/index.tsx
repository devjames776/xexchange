import React from "react";
import { faCheck } from "@fortawesome/pro-regular-svg-icons/faCheck";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import PageState from "components/PageState";
import { txSubmittedModalSelector } from "redux/selectors";

const TxSubmittedModal = () => {
  const txSubmittedModal = useSelector(txSubmittedModalSelector);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    if (txSubmittedModal.sessionId !== "") {
      setShowModal(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txSubmittedModal]);

  const toggleModal = (show: boolean) => () => {
    setShowModal(show);
  };

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          keyboard={false}
          backdrop={true}
          onHide={toggleModal(false)}
          className="modal-container"
          animation={false}
          centered
        >
          <div className="card w-100 tx-sent-modal">
            <PageState
              icon={faCheck}
              iconClass="text-success"
              iconBgClass="icon-state medium bg-success-opaque"
              title={txSubmittedModal.submittedMessage}
              description="Please allow a few moments for the transaction to be processed"
              action={
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Back To Project
                </button>
              }
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default TxSubmittedModal;

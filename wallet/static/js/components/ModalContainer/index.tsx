import * as React from "react";
import { faTimes } from "@fortawesome/pro-regular-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { launchpadOriginSelector } from "redux/selectors";

const ModalContainer = ({
  children,
  noSpacer,
  className,
  title,
  backdropClassName,
}: {
  children: React.ReactNode;
  noSpacer?: boolean;
  className?: string;
  title: React.ReactNode;
  backdropClassName?: string;
}) => {
  const launchpadOrigin = useSelector(launchpadOriginSelector);
  const [close, setClose] = React.useState(false);

  const handleClose = () => {
    setClose(true);
  };

  React.useEffect(() => {
    return () => {
      setClose(false);
    };
  }, []);

  return close ? (
    <Navigate
      to={{
        pathname: launchpadOrigin.pathname,
        search: launchpadOrigin.search,
      }}
    />
  ) : (
    <Modal
      show={true}
      keyboard={false}
      backdrop="static"
      onHide={handleClose}
      className={`modal-container ${className ? className : ""}`}
      backdropClassName={backdropClassName}
      animation={false}
      centered
    >
      <div className="modal-card card w-100">
        <div className="card-title h5 mb-0">
          <div className="d-flex justify-content-between align-items-center pt-spacer px-spacer mb-0">
            <div>{title}</div>
            <button
              type="button"
              className="btn btn-close"
              onClick={handleClose}
            >
              <FontAwesomeIcon size="xs" icon={faTimes} className="text-body" />
            </button>
          </div>
        </div>

        <div
          className={`modal-card-body text-center ${
            noSpacer ? "p-0" : "p-spacer"
          }`}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalContainer;

import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserBlacklisted = () => {
  return (
    <div className="py-spacer px-3 text-center description">
      <div className="icon-state medium bg-danger-opaque mx-auto mb-spacer">
        <FontAwesomeIcon icon={faTimes} className="text-danger" />
      </div>
      <h5 className="text-center">
        Account rejected due to suspicious activity
      </h5>
      <p>
        Any lottery tickets that you purchased were invalidated. The cost of
        those tickets has been refunded: the exact EGLD amount used to purchase
        tickets has been sent back to your wallet.
      </p>
    </div>
  );
};

export default UserBlacklisted;

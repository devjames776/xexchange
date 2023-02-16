import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as BlueTicket } from "./blue_ticket.svg";
import { ReactComponent as DefaultTicket } from "./default_ticket.svg";
import { ReactComponent as GreenTicket } from "./green_ticket.svg";
import { ReactComponent as LightBlueTicket } from "./light_blue_ticket.svg";

const Ticket = ({
  ticketId,
  selected,
  isBought,
  isWinner,
  icon,
}: {
  ticketId: string;
  selected: boolean;
  isBought?: boolean;
  isWinner?: boolean;
  icon?: any;
}) => {
  return (
    <div
      style={{
        position: "relative",
        cursor: isBought || ticketId === "Free" ? "" : "pointer",
      }}
    >
      {ticketId === "Free" ? (
        <div
          style={{
            padding: "3px",
            background: "rgb(31, 161, 112, 0.1)",
            borderRadius: "5px",
            color: "#1FA170",
          }}
        >
          <div
            style={{
              position: "absolute",
              fontSize: "13px",
              top: "50%",
              left: "30px",
              transform: "translateX(-50%) translateY(-50%)",
              fontWeight: "bold",
              color: `${isBought ? "#fff" : "#1FA170"}`,
            }}
          >
            {icon && (
              <>
                <FontAwesomeIcon icon={icon} />
              </>
            )}
          </div>
          {isBought ? <GreenTicket /> : <DefaultTicket />}
          &nbsp;{ticketId}! &nbsp;
        </div>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              fontSize: "13px",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)",
              fontWeight: "bold",
              color: `${
                isBought
                  ? "#fff"
                  : selected
                  ? "#1F43F6"
                  : parseInt(ticketId) === 64
                  ? "#1FA170"
                  : "#748092"
              }`,
            }}
          >
            {ticketId}
            {parseInt(ticketId) === 64 && (
              <>
                <span style={{ color: isBought ? "#fff" : "#1FA170" }}>*</span>
              </>
            )}
          </div>
          {isBought ? (
            <>
              {parseInt(ticketId) === 64 || isWinner ? (
                <GreenTicket />
              ) : (
                <BlueTicket />
              )}
            </>
          ) : selected ? (
            <LightBlueTicket />
          ) : (
            <DefaultTicket />
          )}
        </>
      )}
    </div>
  );
};

export default Ticket;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Ticket from "components/Ticket";
import { allProjects, ProjectsType } from "config";
import { useApiRequests } from "helpers";
import { refetchOriginSelector } from "redux/selectors";

export interface TicketsDataType {
  ticketEntries: Array<string>;
  winningTicketsIds: Array<string>;
  numConfirmedTickets: string;
  hasUserClaimedTokens: boolean;
  wereWinnersSelected: boolean;
}

const Tickets = () => {
  const { getTicketsData } = useApiRequests();
  const [ticketsData, setTicketsData] = useState<TicketsDataType>();
  const refetch = useSelector(refetchOriginSelector);

  const currentProject: ProjectsType = location.pathname.split(
    "/",
  )[1] as ProjectsType;

  const project = allProjects.find((project) => {
    if (project.name === currentProject) {
      return project;
    }
  });

  useEffect(() => {
    setTickets();
  }, [refetch]);

  const setTickets = async () => {
    if (project?.name) {
      const tickets = await getTicketsData(project.name);
      if (tickets.success) {
        setTicketsData(tickets.data);
      }
    }
  };

  const renderConfirmedTickets = (tickets: any, isBought: boolean) => {
    const ticketsToRender = [];
    for (const [index, ticket] of tickets.entries()) {
      ticketsToRender.push(
        <div className="m-1">
          <Ticket
            ticketId={index + 1}
            selected={true}
            isBought={
              ticketsData?.winningTicketsIds?.includes(ticket) ? true : false
            }
            isWinner={
              ticketsData?.winningTicketsIds?.includes(ticket) ? true : false
            }
          />
        </div>,
      );
    }

    return ticketsToRender;
  };

  return (
    <>
      {ticketsData ? (
        <div className="d-flex flex-wrap justify-content-center text-center">
          {ticketsData &&
            ticketsData.ticketEntries.length > 0 &&
            renderConfirmedTickets(ticketsData.ticketEntries, false)}
        </div>
      ) : (
        <div>Tickets will be added soon</div>
      )}
    </>
  );
};

export default Tickets;

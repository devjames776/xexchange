import React, { useEffect, useState } from "react";

import {
  useGetAccountInfo,
  useTrackTransactionStatus,
} from "@elrondnetwork/dapp-core/hooks";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  useNavigate,
  useLocation,
  // RouteComponentProps,
} from "react-router-dom";
import { ProjectAnnouncement, Loader } from "components";
import { allProjects, ProjectsType } from "config";
import { useApiRequests } from "helpers";
import { withRouter } from "helpers/withRouter";
import { refetchOriginSelector } from "redux/selectors";
import SnapshotCountdown from "./SnapshotCountdown";
import UserBlacklisted from "./UserBlacklisted";
import WinnersCountdown from "./WinnersCountdown";
import WinnerSelection from "./WinnerSelection";
import WinnersSelected from "./WinnersSelected";

const addedSeconds = 11;
export enum PhaseEnum {
  setup = "setup",
  confirm = "confirm",
  winnerSelection = "winnerSelection",
  claim = "claim",
}

enum ContractState {
  SNAPSHOT_COUNTDOWN = "snapshotCountdown",
  WINNERS_COUNTDOWN = "winnersCountdown",
  WINNERS_SELECTED = "winnersSelected",
  WINNERS_SELECTION_IN_PROGRESS = "winnersSelectionInProgress",
  USER_BLACKLISTED = "userBlacklisted",
}

const ContractStatus = ({ projectData }: any) => {
  const [contractState, setContractState] = useState("");
  const [winnersCanClaim, setWinnersCanClaim] = useState(false);
  const { getChainStats, getContractStats } = useApiRequests();
  const [countdownDate, setCountdownDate] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);
  const [txSessionId, setTxSessionId] = useState<any>();

  const { getTicketsData, getMysteryBoxData, getFlagsData } = useApiRequests();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [ticketsInfo, setTicketsInfo] = useState<any>(null);
  const [mysteryBoxInfo, setMysteryBoxInfo] = useState<any>(null);
  const [flagsInfo, setFlagsInfo] = useState<any>(null);
  const refetch = useSelector(refetchOriginSelector);

  const currentProject: ProjectsType = pathname.split("/")[1] as ProjectsType;

  const project = allProjects.find((project) => {
    if (project.name === currentProject) {
      return project;
    }
  });

  const setTickets = async () => {
    if (!loggedIn || !project) return;
    const flags = await getFlagsData(project.name);
    const mysteryBox = await getMysteryBoxData(project.name);
    const tickets = await getTicketsData(project.name);

    if (flags.success) {
      setFlagsInfo(flags.data);
    }
    if (mysteryBox.success) {
      setMysteryBoxInfo(mysteryBox.data);
    }

    if (tickets.success) {
      setTicketsInfo(tickets.data);
      return { tickets: tickets.data, flags: flags.data };
    }
  };

  const transactionStatus = useTrackTransactionStatus({
    transactionId: txSessionId,
  });

  useEffect(() => {
    setTxSessionId(localStorage.getItem("txSessionId"));
  }, []);

  useEffect(() => {
    if (transactionStatus && transactionStatus.isSuccessful && txSessionId) {
      setTickets();
      setTxSessionId(null);
      localStorage.removeItem("txSessionId");
    }
  }, [transactionStatus, txSessionId]);

  useEffect(() => {
    setDataFetched(false);
  }, [refetch]);

  useEffect(() => {
    if (new URLSearchParams(search).get("status") === "success") {
      setDataFetched(false);
      navigate(`${pathname}`, { replace: true });
    }
  }, [search]);

  useEffect(() => {
    if (!dataFetched) {
      getContractState();
    }
  }, [contractState, dataFetched]);

  const getContractState = async () => {
    if (!loggedIn) {
      setDataFetched(true);
      return;
    }

    const ticketsData = await setTickets();

    const now = moment.utc();
    try {
      if (!project) return;

      const chainStats = (await getChainStats()).data;

      const { currentPhase, secondsLeft } = (
        await getContractStats(project.name)
      ).data;

      setDataFetched(true);

      if (ticketsData?.tickets?.isUserBlacklisted) {
        setContractState(ContractState.USER_BLACKLISTED);
        return;
      }

      setCountdownDate(
        moment(now)
          .add(parseInt(secondsLeft) + addedSeconds, "seconds")
          .toString(),
      );

      //time until confirmation can start confirmationStartEpoch - users can only watch countdown and see the tier
      if (currentPhase === PhaseEnum.setup) {
        setContractState(ContractState.SNAPSHOT_COUNTDOWN);
        return;
      }

      //time until the winners are slected winnerSelectionStartEpoch - users can confirm tickets
      if (currentPhase === PhaseEnum.confirm) {
        setContractState(ContractState.WINNERS_COUNTDOWN);
        return;
      }

      if (currentPhase === PhaseEnum.winnerSelection) {
        setContractState(ContractState.WINNERS_SELECTION_IN_PROGRESS);
        return;
      }

      if (currentPhase === PhaseEnum.claim && secondsLeft !== 0) {
        setContractState(ContractState.WINNERS_SELECTED);
        return;
      } else {
        setContractState(ContractState.WINNERS_SELECTED);
        setWinnersCanClaim(true);
        return;
      }
    } catch (error) {
      setDataFetched(true);
    }
  };

  if (!dataFetched)
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Loader noText={true} />
      </div>
    );

  switch (contractState) {
    case ContractState.SNAPSHOT_COUNTDOWN:
      return <SnapshotCountdown endDate={countdownDate} />;

    case ContractState.WINNERS_SELECTION_IN_PROGRESS:
      return <WinnerSelection endDate={countdownDate} />;

    case ContractState.WINNERS_COUNTDOWN:
      return (
        <WinnersCountdown
          setTxSessionId={setTxSessionId}
          ticketsData={ticketsInfo}
          endDate={countdownDate}
        />
      );

    case ContractState.WINNERS_SELECTED:
      return (
        <WinnersSelected
          setTxSessionId={setTxSessionId}
          ticketsData={ticketsInfo}
          mysteryBoxData={mysteryBoxInfo}
          canClaim={winnersCanClaim}
          endDate={countdownDate}
          hasMysteryBox={flagsInfo.hasMysteryBox}
        />
      );

    case ContractState.USER_BLACKLISTED:
      return <UserBlacklisted />;

    default:
      return <ProjectAnnouncement data={projectData} />;
  }
};

export default withRouter(ContractStatus);

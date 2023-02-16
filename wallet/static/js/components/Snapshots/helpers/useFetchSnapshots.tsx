import React from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { useIsAuthenticated, useApiRequests } from "helpers";

export interface DayType {
  day: number;
  epoch: number;
  addressLockedAssets: {
    stake: string;
  };
}

export interface WeekType {
  week: number;
  days: DayType[];
}

export type SnapshotsType = WeekType[];

export default function useFetchSnapshots(ref: React.MutableRefObject<null>) {
  const isAuthenticated = useIsAuthenticated();
  const { getSnapshots } = useApiRequests();
  const { address } = useGetAccountInfo();

  const [snapshots, setSnapshots] = React.useState<SnapshotsType>([]);
  const [snapshotsFetched, setSnapshotsFetched] = React.useState<boolean>();

  const fetchSnapshots = async () => {
    const { data, success } = await getSnapshots();
    if (success) {
      setSnapshots(data);
      setSnapshotsFetched(true);
    } else {
      setSnapshotsFetched(false);
    }
  };

  React.useEffect(() => {
    if (ref.current !== null) {
      if (isAuthenticated) {
        fetchSnapshots();
      } else {
        setSnapshotsFetched(true);
      }
    }
  }, [isAuthenticated, address]);

  return {
    snapshots,
    snapshotsFetched: snapshotsFetched === true,
    snapshotsLoading: snapshotsFetched === undefined,
    snapshotsError: snapshotsFetched === false,
  };
}

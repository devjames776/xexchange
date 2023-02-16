import React from "react";
import {
  DIGITS as digits,
  DECIMALS as decimals,
} from "@elrondnetwork/dapp-core/constants";
import { formatAmount } from "@elrondnetwork/dapp-core/utils";
import { faTimes } from "@fortawesome/pro-solid-svg-icons/faTimes";
import { BigNumber } from "bignumber.js";
import { PageState, Loader } from "components";
import { ticketCurrencyLabel } from "config";
import { useIsAuthenticated } from "helpers";
import useFetchSnapshots from "./helpers/useFetchSnapshots";
import SnapshotsTable from "./SnapshotTable";

export const Snapshots = () => {
  const ref = React.useRef(null);
  const isAuthenticated = useIsAuthenticated();
  const { snapshots, snapshotsLoading, snapshotsError } =
    useFetchSnapshots(ref);

  const ready = !snapshotsLoading && !snapshotsError;

  const getAverageValue = (stakingSnapshots: any[]) => {
    if (stakingSnapshots.length > 0) {
      const totalSnapshotDays = 10;
      const predictedDays = [];
      for (let i = 0; i < totalSnapshotDays - stakingSnapshots.length; i++) {
        predictedDays.push(stakingSnapshots[stakingSnapshots.length - 1]);
      }
      const allDays = [...stakingSnapshots, ...predictedDays];
      const sum = allDays.reduce(
        (prev, current) => prev.plus(current?.addressLockedAssets?.stake),
        new BigNumber(0),
      );
      const avg = new BigNumber(sum)
        .dividedToIntegerBy(allDays.length)
        .toString(10);
      return formatAmount({
        input: avg,
        digits,
        addCommas: true,
        showLastNonZeroDecimal: false,
        decimals,
      });
    }

    return "";
  };

  return (
    <>
      {snapshotsLoading && <Loader />}
      {snapshotsError && (
        <PageState icon={faTimes} title="Unable to load snapshots" />
      )}

      <div className="snapshots" ref={ref}>
        {ready && snapshots !== undefined && (
          <div className="mx-auto">
            {isAuthenticated ? (
              <>
                {snapshots.length ? (
                  <div>
                    <SnapshotsTable snapshots={snapshots} />
                    <p className="mt-spacer description text-center">
                      Predicted Average Staked value:{" "}
                      <strong>{getAverageValue(snapshots)}</strong>{" "}
                      {ticketCurrencyLabel}
                    </p>
                  </div>
                ) : (
                  <div className="card">
                    <div className="card-header border-0 p-0">
                      <div className="card-body p-spacer">
                        No Snapshots taken
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="card">
                <div className="card-body p-spacer">
                  <div className="h6 text-center my-spacer">
                    Connect with your wallet to see your details.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Snapshots;

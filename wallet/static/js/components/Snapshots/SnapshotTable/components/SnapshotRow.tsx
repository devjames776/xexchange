import React from "react";
import {
  DIGITS as digits,
  DECIMALS as decimals,
} from "@elrondnetwork/dapp-core/constants";
import { formatAmount } from "@elrondnetwork/dapp-core/utils";
import { ticketCurrencyLabel } from "config";

const totalSnapshotDays = 10;

const SnapshotRow = ({ rowData }: { rowData: any[] }) => {
  const predictedDays = [];
  for (let i = 0; i < totalSnapshotDays - rowData.length; i++) {
    predictedDays.push(rowData[rowData.length - 1]);
  }
  return (
    <>
      {rowData &&
        rowData.map(
          (row, rowIndex: number) =>
            true && (
              <tr
                className={`snapshot-details-row ${
                  rowIndex === 0 ? "first-row" : ""
                }`}
                key={`snapshot-day-${rowIndex}`}
              >
                <td>Day {rowIndex + 1}</td>
                <td>
                  {formatAmount({
                    input: row.addressLockedAssets.stake,
                    digits,
                    addCommas: true,
                    showLastNonZeroDecimal: false,
                    decimals,
                  })}{" "}
                  {ticketCurrencyLabel}
                </td>
              </tr>
            ),
        )}
      {predictedDays &&
        predictedDays.map(
          (row, rowIndex: number) =>
            true && (
              <tr
                className={"snapshot-details-row predicted-day"}
                key={`snapshot-day-${rowIndex + rowData.length}`}
              >
                <td>Day {rowIndex + rowData.length + 1}</td>
                <td>
                  {formatAmount({
                    input: row.addressLockedAssets.stake,
                    digits,
                    addCommas: true,
                    showLastNonZeroDecimal: false,
                    decimals,
                  })}{" "}
                  {ticketCurrencyLabel}
                </td>
              </tr>
            ),
        )}
    </>
  );
};

export default SnapshotRow;

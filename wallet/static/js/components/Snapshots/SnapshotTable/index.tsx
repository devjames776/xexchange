import React from "react";
import { SnapshotsType } from "../helpers/useFetchSnapshots";
import SnapshotRow from "./components/SnapshotRow";

const SnapshotTable = ({ snapshots }: { snapshots: SnapshotsType }) => {
  return (
    <div className="snapshot-table table-wrapper shadow-sm rounded overflow-hidden">
      <div className="table-responsive">
        <table className="table table-striped mb-0">
          <thead className="snapshots-thead text-center align-middle">
            <tr>
              <th>Snapshot day</th>
              <th>EGLD Staked</th>
            </tr>
          </thead>
          <tbody>
            <SnapshotRow rowData={snapshots} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SnapshotTable;

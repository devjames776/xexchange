import React from "react";
import { useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks";
import {
  faCheck,
  faHourglass,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import fileDownload from "js-file-download";
import moment from "moment";
import { Button } from "react-bootstrap";
import { Datepicker, PageState } from "components";
import { useApiRequests } from "helpers";

import "./admin.scss";

const Admin = () => {
  const [selectedFile, setSelectedFile] = React.useState<any>("");
  const [date, setDate] = React.useState("");
  const [importInProgress, setImportInPorgress] = React.useState(false);
  const [importViewActive, setImportViewActive] = React.useState(false);
  const [importError, setImportError] = React.useState(false);
  const { isLoggedIn } = useGetLoginInfo();
  const { downloadCSV, uploadCSV } = useApiRequests();

  const download = async () => {
    const startDate = moment(date).unix();
    const endDate = moment(date).add(1, "d").unix();

    const dl = await downloadCSV(startDate, endDate);
    if (dl.success && dl.data) {
      fileDownload(dl.data, `accounts-${endDate}-${startDate}.csv`);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    setImportInPorgress(true);
    setImportViewActive(true);
    const importResult = await uploadCSV(formData);
    if (!importResult.success) {
      setImportError(true);
    }
    setImportInPorgress(false);
  };

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const setFieldValue = (e: any, timestamp: any) => {
    setDate(timestamp);
  };

  if (importError) {
    return (
      <>
        <div className="d-flex justify-content-center my-auto kyc-step">
          <div className="card" style={{ padding: "20px" }}>
            <PageState
              icon={faTimes}
              iconClass="text-danger"
              iconBgClass="p-4 rounded-bg-circle bg-primary-opaque"
              iconSize="2x"
              title="Something went wrong, please check the .csv file!"
              description=" "
              action={
                <Button
                  onClick={() => {
                    setImportError(false);
                    setSelectedFile("");
                    setImportViewActive(false);
                    setSelectedFile("");
                  }}
                >
                  Done
                </Button>
              }
            />
          </div>
        </div>
      </>
    );
  }

  if (importViewActive) {
    return (
      <>
        <div className="d-flex justify-content-center my-auto kyc-step">
          <div className="card" style={{ padding: "20px" }}>
            <PageState
              icon={importInProgress ? faHourglass : faCheck}
              iconClass={importInProgress ? "text-primary" : "text-success"}
              iconBgClass="p-4 rounded-bg-circle bg-primary-opaque"
              iconSize="2x"
              title={
                importInProgress
                  ? "Please wait, accounts are imported!"
                  : "Accounts imported!"
              }
              description=" "
              action={
                <Button
                  disabled={importInProgress}
                  onClick={() => {
                    setImportViewActive(false);
                    setSelectedFile("");
                  }}
                >
                  Done
                </Button>
              }
            />
          </div>
        </div>
      </>
    );
  }

  if (isLoggedIn) {
    return (
      <>
        <div className="d-flex justify-content-center my-auto kyc-step">
          <div className="card" style={{ padding: "20px" }}>
            <div>
              <h5>Export</h5>
              <div className="display-flex">
                <div style={{ width: "100%" }} className="mb-1">
                  <Datepicker setFieldValue={setFieldValue} />
                </div>
                <div className="mt-3" style={{ width: "100%" }}>
                  <Button className="btn-block" onClick={download}>
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h5>Import</h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 position-relative">
                  <input
                    className="form-control mb-1 hidden"
                    type="file"
                    name="file"
                    onChange={handleFileSelect}
                  />

                  <div className="form-control position-absolute d-flex align-items-stretch overflow-hidden upload">
                    <span className="upload-label d-flex align-items-center">
                      Choose File
                    </span>
                    <span className="d-flex align-items-center">
                      {selectedFile ? selectedFile.name : "No file chosen"}
                    </span>
                  </div>
                </div>

                <input
                  className="btn btn-primary btn-block"
                  type="submit"
                  value="Upload File"
                />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Admin;

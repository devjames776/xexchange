import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { kycEnd } from "config";
import { routeNames } from "routes";

const ProceedKycBtn = () => {
  const navigate = useNavigate();

  const startKYC = async () => {
    navigate("/kyc-section");
  };
  return (
    <>
      {!kycEnd && (
        <Button onClick={startKYC} variant="primary" size="sm">
          Proceed with KYC
        </Button>
      )}
    </>
  );
};

export default ProceedKycBtn;

import React, { useEffect, useState } from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { sendTransactions } from "@elrondnetwork/dapp-core/services";
import { SendTransactionReturnType } from "@elrondnetwork/dapp-core/types";
import { refreshAccount, formatAmount } from "@elrondnetwork/dapp-core/utils";
import { BigNumber } from "bignumber.js";
import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { object, string, boolean } from "yup";
import Loader from "components/Loader";
import Ticket from "components/Ticket";
import { allProjects, ProjectsType, ticketCurrencyLabel, tiers } from "config";
import { useApiRequests } from "helpers";

const ClaimModal = ({
  winningTicketsIds,
  showModal,
  setShowModal,
  setTxSessionId,
  numConfirmedTickets,
}: {
  winningTicketsIds: string[];
  showModal: boolean;
  setTxSessionId: (sessionId: SendTransactionReturnType) => void;
  setShowModal: (show: boolean) => void;
  numConfirmedTickets: number;
}) => {
  const ref = React.useRef(null);

  const { account } = useGetAccountInfo();
  const { getPricePerTicket, getConfirmTicketsTx } = useApiRequests();
  const [pricePerTicket, setPricePerTicket] = useState("");
  const [selectedTickets, setSelectedTickets] = useState<number>(
    winningTicketsIds.length,
  );
  const [mouseInTicketArea, setMouseInTicketArea] = useState<boolean>(false);
  const [ticketHoverSelected, setTicketHoverSelected] = useState<number>(0);

  const currentProject: ProjectsType = location.pathname.split(
    "/",
  )[1] as ProjectsType;

  const project = allProjects.find((project) => {
    if (project.name === currentProject) {
      return project;
    }
  });

  useEffect(() => {
    fetchPrice();
  }, []);

  const fetchPrice = async () => {
    if (!project) return;

    const ticketsPriceResult = await getPricePerTicket(project.name);

    if (ticketsPriceResult.success) {
      setPricePerTicket(ticketsPriceResult.data.price);
    }
  };

  const getTicketPrice = (numTickets: number) => {
    const price = new BigNumber(pricePerTicket);
    return price.multipliedBy(numTickets).toString(10);
  };

  const initialValues = {
    amount: getTicketPrice(winningTicketsIds.length),
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    mysteryBoxChoice: undefined,
  };

  const toggleModal = (show: boolean) => () => {
    setShowModal(show);
  };

  const onSubmit = async () => {
    if (!project) return;

    setShowModal(false);

    const confirmTxResponse = await getConfirmTicketsTx(
      currentProject,
      selectedTickets,
    );
    if (!confirmTxResponse.success) {
      return;
    }
    const claimTransaction = {
      value: confirmTxResponse.data.value,
      data: confirmTxResponse.data.data,
      receiver: confirmTxResponse.data.receiver,
      gasLimit: confirmTxResponse.data.gasLimit,
    };

    const transactions = [];
    if (selectedTickets > 0 && winningTicketsIds.length > 0) {
      transactions.push(claimTransaction);
    }

    await refreshAccount();
    const { sessionId /*, error*/ } = await sendTransactions({
      transactions,
      transactionsDisplayInfo: {
        processingMessage: "Processing confirm tickets transaction",
        errorMessage: "An error has occured during confirm tickets",
        successMessage: "Confirm tickets transaction successful",
        transactionDuration: 10000,
      },
    });
    setTxSessionId(sessionId);
    if (sessionId) localStorage.setItem("txSessionId", sessionId);
  };

  //#region FORMIK INIT

  const validationSchema = object().shape({
    amount: string()
      .required("Required")
      .test("minAmount", "Nothing selected to be bought.", (value) => {
        if (value) {
          const bnAmount = new BigNumber(value);
          return bnAmount.isGreaterThan(0);
        }
        return true;
      })

      .test("funds", "Insufficient funds", (value) => {
        if (value !== undefined) {
          return new BigNumber(account.balance).isGreaterThan(
            new BigNumber(value)
              .plus(new BigNumber(10000000000000000))
              .toString(10),
          );
        }
        return true;
      }),
    checkbox1: boolean().test(
      "check1",
      "You need to agree to the terms of sale.",
      (value) => {
        return value ? true : false;
      },
    ),

    checkbox2: boolean().test(
      "check2",
      "You need to agree to the terms of sale.",
      (value) => {
        return value ? true : false;
      },
    ),

    checkbox3: boolean().test(
      "age",
      "Please confirm that you are over 18 years old.",
      (value) => {
        return value ? true : false;
      },
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    setFieldValue,
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    getFieldProps,
    setFieldError,
  } = formik;

  const { amount } = values;
  useEffect(() => {
    setFieldError("checkbox1", "Required");
  }, []);
  useEffect(() => {
    if (!pricePerTicket) {
      return;
    }
    setFieldValue("amount", getTicketPrice(selectedTickets));
  }, [selectedTickets, pricePerTicket]);
  //#endregion

  return (
    <>
      <Modal
        show={showModal}
        backdrop={true}
        onHide={toggleModal(false)}
        className="modal-container claim-modal"
        animation={false}
        centered
      >
        {pricePerTicket ? (
          <form
            onSubmit={handleSubmit}
            noValidate={true}
            ref={ref}
            className="w-100 card"
          >
            <input
              type="hidden"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />

            <div className="p-spacer d-flex flex-column text-center ">
              <h5 className="mb-3">Select the number of tickets to buy</h5>
              <p className="mb-0 text-secondary small">
                1 Ticket ={" "}
                {formatAmount({
                  input: pricePerTicket,
                  showLastNonZeroDecimal: true,
                  addCommas: false,
                })}{" "}
                {ticketCurrencyLabel}
              </p>

              <div
                className={`d-flex mt-5 mb-5 flex-wrap ${
                  numConfirmedTickets + winningTicketsIds.length <= 8
                    ? "justify-content-center"
                    : "justify-content-between"
                }`}
                onMouseOver={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setMouseInTicketArea(true);
                }}
                onMouseLeave={() => {
                  setMouseInTicketArea(false);
                }}
              >
                {Array.apply(0, Array(numConfirmedTickets)).map(function (
                  x,
                  i,
                ) {
                  return (
                    <div
                      key={i}
                      className="m-1"
                      style={{
                        cursor: `${
                          i + 1 === numConfirmedTickets ? "pointer" : "default"
                        }`,
                      }}
                      onClick={() => {
                        if (i + 1 === numConfirmedTickets) {
                          setSelectedTickets(0);
                        }
                      }}
                      onMouseOver={(event) => {
                        setTicketHoverSelected(-1);
                      }}
                    >
                      <Ticket
                        ticketId={(i + 1).toString()}
                        selected={false}
                        isBought={true}
                      />
                    </div>
                  );
                })}

                {winningTicketsIds.map((ticket: string, index: number) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="m-1"
                        onClick={() => {
                          setSelectedTickets(index + 1);

                          setFieldValue("amount", getTicketPrice(index + 1));
                        }}
                        onMouseOver={(event) => {
                          setTicketHoverSelected(index);
                        }}
                      >
                        <Ticket
                          ticketId={(
                            index +
                            1 +
                            numConfirmedTickets
                          ).toString()}
                          selected={
                            mouseInTicketArea
                              ? index <= ticketHoverSelected
                              : index + 1 <= selectedTickets
                          }
                        />
                      </div>
                    </>
                  );
                })}

                {numConfirmedTickets + winningTicketsIds.length ===
                  tiers[0].tickets && (
                  <div
                    className=" w-100 text-left mt-2 text-center"
                    style={{ color: "#1FA170" }}
                  >
                    <span className="font-weight-bold">* 1</span> guaranteed
                    winning ticket included with{" "}
                    <span className="font-weight-bold">64</span> tickets
                    purchased
                  </div>
                )}
              </div>

              <div className="" style={{ textAlign: "left" }}>
                <div className="mt-4 mb-0">
                  <Form.Check type="checkbox">
                    <Form.Check.Input
                      type="checkbox"
                      id="checkbox1"
                      name="checkbox1"
                      onClick={() => {
                        setFieldValue(
                          "checkbox1",
                          !getFieldProps("checkbox1").value,
                        );
                      }}
                    />
                    <Form.Check.Label htmlFor="checkbox1">
                      I hereby declare that I have read and agree with the{" "}
                      <a
                        href="https://ashswap.io/files/terms-of-sale.pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms of Sale.
                      </a>
                    </Form.Check.Label>
                  </Form.Check>
                </div>
                {"checkbox1" in errors &&
                  touched.checkbox1 &&
                  errors.checkbox1 && (
                    <div
                      className="text-danger small mt-1 text-center"
                      data-testid="invalidAmount1"
                    >
                      {touched.checkbox1 && errors.checkbox1}
                    </div>
                  )}

                <div className="mt-4 mb-0">
                  <Form.Check type="checkbox">
                    <Form.Check.Input
                      type="checkbox"
                      id="checkbox2"
                      name="checkbox2"
                      onClick={() => {
                        setFieldValue(
                          "checkbox2",
                          !getFieldProps("checkbox2").value,
                        );
                      }}
                    />
                    <Form.Check.Label htmlFor="checkbox2">
                      I hereby declare that I waive any rights for Basic
                      Information Document according to “Art. 31 et seq TVTG”.
                      (For more details see Section 8 from{" "}
                      <a
                        href="https://ashswap.io/files/terms-of-sale.pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms of Sale
                      </a>
                      , page 7)
                    </Form.Check.Label>
                  </Form.Check>
                </div>
                {"checkbox2" in errors &&
                  touched.checkbox2 &&
                  errors.checkbox2 && (
                    <div
                      className="text-danger small mt-1 text-center"
                      data-testid="invalidAmount1"
                    >
                      {touched.checkbox2 && errors.checkbox2}
                    </div>
                  )}

                <div className="mt-3 mb-0">
                  <Form.Check type="checkbox">
                    <Form.Check.Input
                      type="checkbox"
                      id="checkbox3"
                      onClick={() => {
                        setFieldValue(
                          "checkbox3",
                          !getFieldProps("checkbox3").value,
                        );
                      }}
                    />
                    <Form.Check.Label htmlFor="checkbox3">
                      I hereby declare that I am over 18 years old and that I am
                      not acting as a proxy but on my own behalf and that I am
                      the beneficial owner of the funds used for purchasing the
                      Tokens.
                    </Form.Check.Label>
                  </Form.Check>
                </div>
                {"checkbox3" in errors &&
                  touched.checkbox3 &&
                  errors.checkbox3 && (
                    <div
                      className="text-danger small mt-1 text-center"
                      data-testid="invalidAmount4"
                    >
                      {touched.checkbox3 && errors.checkbox3}
                    </div>
                  )}
              </div>
              <p className="mt-4 mb-0 text-secondary small">
                <>
                  {winningTicketsIds.length === 0 ? (
                    ""
                  ) : (
                    <>
                      You are about to buy {selectedTickets} ASH token{" "}
                      {selectedTickets === 1 ? "ticket" : "tickets"} for{" "}
                      {formatAmount({
                        input: getTicketPrice(selectedTickets),
                        showLastNonZeroDecimal: true,
                        addCommas: false,
                      })}{" "}
                      {ticketCurrencyLabel}.
                    </>
                  )}
                </>
              </p>
              {"amount" in errors && touched.amount && errors.amount && (
                <div
                  className="text-danger small mt-1 "
                  data-testid="invalidAmount2"
                >
                  {touched.amount && errors.amount}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg py-2 px-spacer mx-auto mt-3"
              >
                Buy tickets
              </button>
            </div>
          </form>
        ) : (
          <div className="d-flex align-items-center justify-content-center mx-auto flex-fill">
            <Loader />
          </div>
        )}
      </Modal>
    </>
  );
};

export default ClaimModal;

import React, { useState } from "react";
import { services } from "@elrondnetwork/dapp-core-internal";
import { useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks/account/useGetLoginInfo";
import { ExtensionLoginButton } from "@elrondnetwork/dapp-core/UI/extension/ExtensionLoginButton";
import { LedgerLoginButton } from "@elrondnetwork/dapp-core/UI/ledger/LedgerLoginButton";
import { WalletConnectLoginButton } from "@elrondnetwork/dapp-core/UI/walletConnect/WalletConnectLoginButton";
import { WebWalletLoginButton } from "@elrondnetwork/dapp-core/UI/webWallet/WebWalletLoginButton";
import { faArrowRight, faInfoCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactComponent as ElrondWebWallet } from "assets/images/elrond-webwallet.svg";
import { ReactComponent as LedgerSymbol } from "assets/images/ledger-symbol.svg";
import { ReactComponent as MaiarApp } from "assets/images/maiar-app.svg";
import { ReactComponent as MaiarExtension } from "assets/images/maiar-extension.svg";

import ModalContainer from "components/ModalContainer";
import { network } from "config";
import { launchpadOriginSelector } from "redux/selectors";
import { routeNames } from "routes";

declare global {
  interface Window {
    elrondWallet: { extensionId: string };
  }
}

enum LoginContainersTypesEnum {
  walletConnect = "walletConnect",
  ledger = "ledger",
  none = "none",
}

export const UnlockTitle = (
  <div className="unlock-title">
    Connect to a wallet{" "}
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => (
        <Tooltip id="connect-to-wallet-tooltip" {...props}>
          Connect securely using one of the provided options
        </Tooltip>
      )}
    >
      <span data-testid="infoConnect">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="i-icon text-secondary"
        />
      </span>
    </OverlayTrigger>
  </div>
);

const Unlock = ({
  plainForm,
  tutorialInfo,
}: {
  plainForm?: boolean;
  tutorialInfo?: boolean;
}) => {
  const launchpadOrigin = useSelector(launchpadOriginSelector);
  const { isLoggedIn } = useGetLoginInfo();
  const [token, setToken] = React.useState("");
  const [openedLoginContainerType, setOpenedContainerType] = useState(
    LoginContainersTypesEnum.none,
  );
  React.useEffect(() => {
    services.maiarId
      .init({ maiarIdApi: network.maiarIdApi })
      .then((loginToken) => {
        setToken(loginToken);
      });
  }, []);

  // TODO check how to get walletConnectBridge in dapp-core
  // this flag needs to be taken into account for disabled flag for maiar login btn
  // const { walletConnectBridge } = Dapp.useContext();

  const loginParams = {
    callbackRoute: launchpadOrigin.pathname,
    token,
    logoutRoute: routeNames.home,
    redirectAfterLogin: false,
    wrapContentInsideModal: false,
    hideButtonWhenModalOpens: true,
    shouldRenderDefaultCss: false,
    className: "login-btn",
    disabled: token === "",
  };

  function handleOpenWalletConnect() {
    setOpenedContainerType(LoginContainersTypesEnum.walletConnect);
  }

  function handleOpenLedgerLogin() {
    setOpenedContainerType(LoginContainersTypesEnum.ledger);
  }

  function getLoginTitle() {
    switch (openedLoginContainerType) {
      case LoginContainersTypesEnum.walletConnect:
        return "Login with Maiar";
      case LoginContainersTypesEnum.ledger:
        return "Login with ledger";
      default:
        return UnlockTitle;
    }
  }

  function renderLoginButton(
    content: React.ReactNode,
    containerType = LoginContainersTypesEnum.none,
  ) {
    const shouldRender =
      openedLoginContainerType == LoginContainersTypesEnum.none ||
      containerType === openedLoginContainerType;
    return shouldRender ? content : null;
  }

  if (isLoggedIn) {
    return <Navigate to={routeNames.home} />;
  }
  const getLoginForm = () => {
    return (
      <div className="unlock-page">
        {renderLoginButton(
          !window.elrondWallet ? (
            <a
              rel="noreferrer"
              href="https://chrome.google.com/webstore/detail/dngmlblcodfobpdpecaadgfbcggfjfnm?authuser=0&hl=en"
              target="_blank"
              className="btn btn-unlock btn-block"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="title">
                  <MaiarExtension className="maiar-symbol" height="20" />
                  Maiar DeFi Wallet
                </div>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </a>
          ) : (
            <ExtensionLoginButton {...loginParams}>
              <div className="btn btn-unlock btn-block">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row method">
                    <div className="title">
                      <MaiarExtension className="maiar-symbol" height="20" />
                      Maiar DeFi Wallet
                    </div>
                  </div>

                  <FontAwesomeIcon icon={faArrowRight} className="arrow" />
                </div>
              </div>
            </ExtensionLoginButton>
          ),
        )}

        {renderLoginButton(
          <WalletConnectLoginButton
            onModalOpens={handleOpenWalletConnect}
            {...loginParams}
          >
            <div className="btn btn-unlock btn-block">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-row method">
                  <div className="title d-flex align-items-center">
                    <MaiarApp className="maiar-symbol maiar-app" height="20" />
                    Maiar App
                  </div>
                </div>
                <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </div>
            </div>
          </WalletConnectLoginButton>,
          LoginContainersTypesEnum.walletConnect,
        )}

        {renderLoginButton(
          <LedgerLoginButton
            loginButtonText={""}
            onModalOpens={handleOpenLedgerLogin}
            {...loginParams}
          >
            <div className="btn btn-unlock btn-block">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-row method">
                  <div className="title">
                    <LedgerSymbol className="elrond-symbol body" height="20" />
                    Ledger
                  </div>
                </div>

                <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </div>
            </div>
          </LedgerLoginButton>,
          LoginContainersTypesEnum.ledger,
        )}

        {renderLoginButton(
          <>
            <WebWalletLoginButton {...loginParams}>
              <div className="btn btn-unlock btn-block">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row method">
                    <div className="title">
                      <ElrondWebWallet className="elrond-symbol body" />
                      Elrond Web Wallet
                    </div>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="arrow" />
                </div>
              </div>
            </WebWalletLoginButton>
            {!tutorialInfo && (
              <>
                <div className="mt-spacer">
                  <span className="text-secondary">New to Elrond?</span>
                </div>
                <div className="mt-1">
                  <a
                    className="link-style"
                    href={`${network.walletAddress}/create`}
                    {...{ target: "_blank" }}
                  >
                    Learn How to setup a wallet
                  </a>
                </div>
              </>
            )}
          </>,
        )}
      </div>
    );
  };
  if (plainForm) {
    return <>{getLoginForm()}</>;
  }
  return (
    <ModalContainer title={getLoginTitle()}>{getLoginForm()}</ModalContainer>
  );
};

export default Unlock;

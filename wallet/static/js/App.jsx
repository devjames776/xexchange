import * as React from "react";
import { hooks } from "@elrondnetwork/dapp-core-internal";

import {
  kycRouter,
  KYC_PROVIDERS,
  KycProvider,
} from "@elrondnetwork/dapp-core-kyc";

import {
  useGetLoginInfo,
  useGetAccountInfo,
} from "@elrondnetwork/dapp-core/hooks/";
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
} from "@elrondnetwork/dapp-core/UI";
import { DappProvider } from "@elrondnetwork/dapp-core/wrappers";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Layout, PageNotFoud } from "components";
import { environment, kycEnd, kycServiceApi, network } from "config";
import AxiosInterceptors from "helpers/AxiosInterceptors";
import { useShouldAllowFullKyc } from "hooks/useShouldAllowFullKyc";
import { persistor, store } from "./redux/store";
import routes from "./routes";

export const ContextApp = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AxiosInterceptors>
            <DappProvider
              environment={environment}
              customNetworkConfig={{
                walletConnectBridgeAddresses:
                  network.walletConnectBridgeAddresses,
                apiAddress: network.apiAddress,
              }}
            >
              <Layout>
                <KycProvider
                  consumerHandlers={{
                    useGetIsAuthenticated: hooks.useGetIsAuthenticated,
                    useGetLoginInfo,
                    useGetAccountInfo,
                    useShouldAllowFullKyc: useShouldAllowFullKyc,
                  }}
                  config={{
                    authTokenApiURL: network.maiarIdApi,
                    project: "AshSwap",
                    kycProvider: KYC_PROVIDERS.onfido,
                    kycActive: !kycEnd,
                    forceKycSignup: true,
                    kycServiceApi: kycServiceApi,
                  }}
                >
                  <TransactionsToastList />
                  <NotificationModal />
                  <SignTransactionsModals className="custom-class-for-modals" />
                  <Routes>
                    {routes.map((route, i) => {
                      return (
                        <Route
                          path={route.path}
                          key={route.path + i}
                          element={<route.component />}
                        />
                      );
                    })}
                    {kycRouter()}
                    <Route path="*" element={<PageNotFoud />} />
                  </Routes>
                </KycProvider>
              </Layout>
            </DappProvider>
          </AxiosInterceptors>
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default ContextApp;

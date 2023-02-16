import { RootState } from "../store";
import { createDeepEqualSelector } from "./helpers";

export const appSelector = (state: RootState) => state.app;

export const darkThemeSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.darkTheme,
);

export const launchpadOriginSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.launchpadOrigin,
);

export const refetchOriginSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.refetch,
);

export const toastsOriginSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.toasts,
);

export const usdValueSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.usdValue,
);

export const toastSignSessionsSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.toastSignSessions,
);

export const txSubmittedModalSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.txSubmittedModal,
);

export const updateAccountAddressTokenSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.updateAccountAddressToken,
);

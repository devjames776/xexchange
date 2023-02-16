import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastType } from "helpers/types";

export interface AppStateType {
  launchpadOrigin: {
    pathname: string;
    search: string;
  };
  updateAccountAddressToken: string;
  darkTheme: boolean | undefined;
  usdValue?: number;
  toasts: ToastType[];
  toastSignSessions: string[];
  refetch: number;
  txSubmittedModal: {
    sessionId: string;
    submittedMessage: string;
  };
}

const initialState: AppStateType = {
  launchpadOrigin: {
    pathname: "home",
    search: "",
  },
  updateAccountAddressToken: "",
  darkTheme: undefined,
  usdValue: undefined,
  toasts: [],
  toastSignSessions: [],
  refetch: 0,
  txSubmittedModal: {
    sessionId: "",
    submittedMessage: "",
  },
};

export const appSlice = createSlice({
  name: "applicationDefaultSlice",
  initialState,
  reducers: {
    setLaunchpadOrigin: (
      state: AppStateType,
      action: PayloadAction<AppStateType["launchpadOrigin"]>,
    ) => {
      const launchpadOrigin = action.payload;
      state.launchpadOrigin = launchpadOrigin;
    },
    setUpdateAccountAddressToken: (
      state: AppStateType,
      action: PayloadAction<AppStateType["updateAccountAddressToken"]>,
    ) => {
      const updateAccountAddressToken = action.payload;
      state.updateAccountAddressToken = updateAccountAddressToken;
    },
    setDarkTheme: (
      state: AppStateType,
      action: PayloadAction<AppStateType["darkTheme"]>,
    ) => {
      const darkTheme = action.payload;
      state.darkTheme = darkTheme;
    },
    setUsdValue: (
      state: AppStateType,
      action: PayloadAction<AppStateType["usdValue"]>,
    ) => {
      const usdValue = action.payload;
      state.usdValue = usdValue;
    },
    updateRefetch: (state: AppStateType) => {
      state.refetch = Date.now();
    },
    addToastSignSession: (
      state: AppStateType,
      action: PayloadAction<string>,
    ) => {
      const toastSignSession = action.payload;
      const existingSessions = [...state.toastSignSessions];

      state.toastSignSessions = existingSessions.includes(toastSignSession)
        ? existingSessions
        : [toastSignSession, ...existingSessions];
    },
    removeToastSignSession: (
      state: AppStateType,
      action: PayloadAction<string>,
    ) => {
      const toastSignSession = action.payload;

      state.toastSignSessions = [...state.toastSignSessions].filter(
        (hash) => hash !== toastSignSession,
      );
    },
    addToast: (state: AppStateType, action: PayloadAction<ToastType>) => {
      const toast = action.payload;
      state.toasts = [toast, ...state.toasts];
    },
    updateToast: (state: AppStateType, action: PayloadAction<ToastType>) => {
      const toast = action.payload;
      const toasts = [...state.toasts];
      const toastIndex = toasts.findIndex((t) => t.id === toast.id);
      if (toastIndex >= 0) {
        toasts[toastIndex] = {
          ...toast,
          isUpdate: true,
        };
      }
      state.toasts = toasts;
    },
    removeToast: (
      state: AppStateType,
      action: PayloadAction<ToastType["id"]>,
    ) => {
      const id = action.payload;
      state.toasts = state.toasts.filter((t: ToastType) => t.id !== id);
    },
    setTxSubmittedModal: (
      state: AppStateType,
      action: PayloadAction<AppStateType["txSubmittedModal"]>,
    ) => {
      const txSubmittedModal = action.payload;
      state.txSubmittedModal = txSubmittedModal;
    },
  },
});

export const {
  setLaunchpadOrigin,
  addToastSignSession,
  removeToast,
  removeToastSignSession,
  setDarkTheme,
  addToast,
  setUpdateAccountAddressToken,
  setUsdValue,
  updateRefetch,
  updateToast,
  setTxSubmittedModal,
} = appSlice.actions;

export default appSlice.reducer;

import moment from "moment";
import storage from "./index";

export const localStorageKeys = {
  maiarLaunchpadLoginExpiresAt: "maiarLaunchpadLoginExpiresAt",
  darkTheme: "darkTheme",
  launchpadSessions: "launchpadSessions",
  logoutEvent: "logoutEvent",
  accessToken: "accessToken",
  tolerance: "tolerance",
  txDeadlineSec: "txDeadlineSec",
  shard: "shard",
  tokenData: "tokenData",
} as const;

export type LocalKeyType =
  | "maiarLaunchpadLoginExpiresAt"
  | "darkTheme"
  | "launchpadSessions"
  | "logoutEvent"
  | "accessToken";
export type LocalAccountKeyType =
  | "tolerance"
  | "txDeadlineSec"
  | "shard"
  | "tokenData";
type ExpiresType = number | false;

export const setItem = ({
  key,
  data,
  expires,
}: {
  key: LocalKeyType;
  data: any;
  expires: ExpiresType;
}) => {
  localStorage.setItem(
    String(key),
    JSON.stringify({
      expires,
      data,
    }),
  );
};

export const getItem = (key: LocalKeyType): any => {
  const item = localStorage.getItem(String(key));
  if (!item) {
    return null;
  }

  const deserializedItem = JSON.parse(item);
  if (!deserializedItem) {
    return null;
  }

  if (
    !deserializedItem.hasOwnProperty("expires") ||
    !deserializedItem.hasOwnProperty("data")
  ) {
    return null;
  }

  const expired = moment().unix() >= deserializedItem.expires;
  if (expired) {
    localStorage.removeItem(String(key));
    return null;
  }

  return deserializedItem.data;
};

export const removeItem = (key: LocalKeyType) =>
  localStorage.removeItem(String(key));

export const clear = (excludeKeys: Array<string> = []) => {
  const excludeValues: Array<{ key: string; value: string | null }> = [];
  if (excludeKeys) {
    for (const key of excludeKeys) {
      excludeValues.push({ value: localStorage.getItem(key), key });
    }
  }
  localStorage.clear();

  if (excludeValues.length > 0) {
    for (const keyValue of excludeValues) {
      if (keyValue.key && keyValue.value)
        localStorage.setItem(keyValue.key, keyValue.value);
    }
  }
};

export function getNewLoginExpiresTimestamp() {
  return new Date().setHours(new Date().getHours() + 24);
}

export function setLoginExpiresAt(expiresAt: number) {
  storage.local.setItem({
    key: localStorageKeys.maiarLaunchpadLoginExpiresAt,
    data: expiresAt,
    expires: expiresAt,
  });
}

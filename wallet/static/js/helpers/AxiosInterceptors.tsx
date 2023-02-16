import * as React from "react";
import axios from "axios";
import moment from "moment";
import { network } from "config";
import { getItem, setItem } from "storage/local";

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Unable to parse jwt", err);
    return {};
  }
};

const AxiosInterceptors = ({ children }: { children: React.ReactNode }) => {
  const promiseRef = React.useRef<Promise<string | undefined>>();

  const getStorageAccessToken = () => {
    const storageAccessToken: string | null = getItem("accessToken");

    if (storageAccessToken) {
      const { exp: tokenTimestamp } = parseJwt(storageAccessToken);

      if (tokenTimestamp !== undefined) {
        const now = Math.floor(Date.now() / 1000);
        const expired = tokenTimestamp - now < 120; // expired or expires in 2m

        if (!expired) {
          return storageAccessToken;
        }
      }
    }

    return undefined;
  };

  const fetchToken = async () => {
    const instance = axios.create();

    try {
      const { data } = await instance.get(
        "https://extras-api.elrond.com/access",
      );
      const newToken: string = data;

      const expires = moment().add(2, "hours").unix();
      setItem({
        key: "accessToken",
        data: newToken,
        expires,
      });

      return newToken;
    } catch {
      return undefined;
    }
  };

  const getAccessToken = async () => {
    if (promiseRef.current) {
      return promiseRef.current;
    } else {
      const storageAccessToken = getStorageAccessToken();
      if (storageAccessToken) {
        return storageAccessToken;
      } else {
        promiseRef.current = fetchToken();
        return promiseRef.current;
      }
    }
  };

  axios.interceptors.request.use(
    async (config) => {
      if (!config) return;
      if (network.apiAddress.includes("internal")) {
        const accessToken = await getAccessToken();
        promiseRef.current = undefined;

        if (accessToken) {
          config.headers = {
            Authorization: `Bearer ${accessToken}`,
          };
        }
      }

      return config;
    },
    (error) => {
      console.error(error);
      Promise.reject(error);
    },
  );

  return <>{children}</>;
};

export default AxiosInterceptors;

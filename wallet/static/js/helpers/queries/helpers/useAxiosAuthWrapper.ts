import { services } from "@elrondnetwork/dapp-core-internal";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import defaultAxios, { AxiosInstance, AxiosError } from "axios";
import useLogout from "components/Layout/Navbar/useLogout";
import { network } from "config";

const isTest = process.env.NODE_ENV === "test";

const useAxiosAuthWrapper = () => {
  const { address } = useGetAccountInfo();
  const logOut = useLogout();

  return async (): Promise<AxiosInstance> => {
    if (isTest || address === "") {
      return defaultAxios;
    } else {
      const authInstance = defaultAxios.create();

      authInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          if (error.response?.status === 403) {
            logOut();
          }
          return Promise.reject(error);
        },
      );

      try {
        const tokenData = await services.maiarId.getAccessToken({
          address,
          maiarIdApi: network.maiarIdApi,
          timeout: parseInt(network.apiTimeout),
        });

        authInstance.interceptors.request.use((config) => {
          if (config?.headers) {
            config.headers.Authorization = tokenData
              ? `Bearer ${tokenData.accessToken}`
              : "";
          }
          return config;
        });
      } catch {}

      return authInstance;
    }
  };
};

export default useAxiosAuthWrapper;

import defaultAxios from "axios";
import {
  currentProject,
  launchpadApiAddress,
  strapiCMSAddress,
  geoCodeApi,
  network,
  kycServiceApi,
} from "config";
import useAxiosAuthWrapper from "./helpers/useAxiosAuthWrapper";

async function asyncWrapper(
  asyncRequest: () => Promise<any>,
): Promise<{ data?: any; success: boolean; message?: string; error?: any }> {
  try {
    const { data } = await asyncRequest();

    return {
      data,
      success: data !== undefined,
    };
  } catch (error: any) {
    return {
      error,
      success: false,
    };
  }
}
const useApiRequests = () => {
  const { apiAddress } = network;
  const axiosAuthWrapper = useAxiosAuthWrapper();

  return {
    getUsdPrice: () =>
      asyncWrapper(() =>
        defaultAxios.get(`${apiAddress}/economics`, {
          timeout: parseInt(network.apiTimeout),
        }),
      ),
    getCMSData: (project?: string) =>
      asyncWrapper(() =>
        defaultAxios.get(
          `${strapiCMSAddress}/projects/?filters[name][$eq]=${
            project || currentProject
          }&populate=deep`,
          {
            timeout: parseInt(network.apiTimeout),
          },
        ),
      ),
    getChainStats: () =>
      asyncWrapper(() =>
        asyncWrapper(() =>
          defaultAxios.get(`${apiAddress}/stats`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      ),
    getTransactionsBatch: (toastSignSession: string) =>
      axiosAuthWrapper().then((axios) =>
        axios.get(
          `${network.extrasApi}/transactions/batch/${toastSignSession}`,
          {
            timeout: parseInt(network.apiTimeout),
          },
        ),
      ),
    sendTransactions: (data: any) =>
      axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(`${network.extrasApi}/transactions/batch`, data, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      ),

    getGeoCode: () =>
      axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(geoCodeApi, {}, { timeout: parseInt(network.apiTimeout) }),
        ),
      ),
    downloadCSV: (startDate: number, endDate: number) => {
      return axiosAuthWrapper().then((axios) => {
        return asyncWrapper((): any => {
          return axios.post(
            `${launchpadApiAddress}/export`,
            {
              startDate,

              endDate,
            },
            {
              timeout: parseInt(network.apiTimeout),
            },
          );
        });
      });
    },
    uploadCSV: (formData: any) => {
      return axiosAuthWrapper().then((axios) => {
        return asyncWrapper((): any => {
          return axios.post(`${launchpadApiAddress}/import`, formData, {
            timeout: 1000 * 60 * 5,
            headers: { "Content-Type": "multipart/form-data" },
          });
        });
      });
    },
    getUpdateAccountAddressToken: () => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(
            `${launchpadApiAddress}/account/updateAccountAddressToken`,
            {
              timeout: parseInt(network.apiTimeout),
            },
          ),
        ),
      );
    },
    getContractStats: (projectName: string) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/state/config/${projectName}`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },
    getTicketsData: (projectName: string) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/tickets/${projectName}`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    getPricePerTicket: (projectName: string) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/tickets/price/${projectName}`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    getConfirmTicketsTx: (projectName: string, ticketsAmount: number) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(
            `${launchpadApiAddress}/tickets/confirm/${projectName}?tickets=${ticketsAmount}`,
            {
              timeout: parseInt(network.apiTimeout),
            },
          ),
        ),
      );
    },

    getClaimTicketsTx: (projectName: string): any => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/tickets/claim/${projectName}`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    getMysteryBoxPrice: (projectName: string) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/mystery-box/price/${projectName}`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },
    getMysteryBoxData: (projectName: string) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/mystery-box/${projectName}`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    getFlagsData: (projectName: string) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/state/flags/${projectName}`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    getAccountState: (projectName: string) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/address/state/${projectName}`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    getStakedAmount: () => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/stake`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    getKycToken: () => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/kyc-session`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },
    createKycToken: (userDOB?: string) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(
            `${launchpadApiAddress}/kyc-session`,
            { userDOB: userDOB || null },
            {
              timeout: parseInt(network.apiTimeout),
            },
          ),
        ),
      );
    },

    getKycStatus: () => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/kyc-status`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    startKycCheck: () => {
      return axiosAuthWrapper().then((axios) => {
        return asyncWrapper(() =>
          axios.get(`${launchpadApiAddress}/account/startKycCheck`, {
            timeout: parseInt(network.apiTimeout),
          }),
        );
      });
    },

    setEmailAddress: (userData: { email: string }) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(`${launchpadApiAddress}/email`, userData, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    resendEmail: () => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(`${launchpadApiAddress}/email/resend`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    setName: (userData: {
      firstName: string;
      lastName: string;
      dob: string;
    }) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(`${launchpadApiAddress}/name`, userData, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    updateAccountAddress: (token: string) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(`${kycServiceApi}/accounts/change-address/${token}`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      );
    },

    kycFinished: () => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(
            `${launchpadApiAddress}/kyc-session/end`,
            {},
            {
              timeout: parseInt(network.apiTimeout),
            },
          ),
        ),
      );
    },

    validateEmail: ({
      emailValidationToken,
    }: {
      emailValidationToken: string;
    }) => {
      return axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(
            `${launchpadApiAddress}/email/confirm`,
            { token: emailValidationToken },
            {
              timeout: parseInt(network.apiTimeout),
            },
          ),
        ),
      );
    },
    maiarLogin: (data: any) =>
      axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(`${network.maiarIdApi}/login`, data, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      ),
    maiarLoginInit: () =>
      axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(`${network.maiarIdApi}/login/init`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      ),
    generateAccessToken: (refreshToken: string) =>
      axiosAuthWrapper().then((axios) =>
        asyncWrapper(() =>
          axios.post(
            `${network.maiarIdApi}/login/access-token-generate`,
            { refreshToken },
            { timeout: parseInt(network.apiTimeout) },
          ),
        ),
      ),
    getSnapshots: () =>
      axiosAuthWrapper().then((authAxios) =>
        asyncWrapper(() =>
          authAxios.get(`${launchpadApiAddress}/statistics`, {
            timeout: parseInt(network.apiTimeout),
          }),
        ),
      ),
  };
};

export default useApiRequests;

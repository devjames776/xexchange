import { hooks } from "@elrondnetwork/dapp-core-internal";
import {
  useGetAccountInfo,
  useGetLoginInfo,
} from "@elrondnetwork/dapp-core/hooks";
import { network } from "config";

const useIsAuthenticated = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const { address } = useGetAccountInfo();
  const { isAuthenticated } = hooks.useGetIsAuthenticated(
    address,
    network.maiarIdApi,
    isLoggedIn,
  );

  return isAuthenticated;
};

export default useIsAuthenticated;

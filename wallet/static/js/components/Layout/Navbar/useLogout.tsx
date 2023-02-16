import { services } from "@elrondnetwork/dapp-core-internal";
import { logout } from "@elrondnetwork/dapp-core/utils";
import { useNavigate } from "react-router-dom";
import { routeNames } from "routes";
import storage from "storage";

const useLogout = () => {
  const navigate = useNavigate();

  return async (callbackUrl?: string, pathname?: string) => {
    try {
      services.maiarId.removeToken();
      await logout(callbackUrl, () => {
        navigate(pathname ? pathname : routeNames.home);
      });

      storage.local.clear(["updateAddressToken"]);
    } catch (err) {
      console.error("Unable to logout from dapp", err);
    }
  };
};

export default useLogout;

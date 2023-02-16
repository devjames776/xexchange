import * as React from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { refreshAccount } from "@elrondnetwork/dapp-core/utils";
import { useSelector } from "react-redux";
import { refetchOriginSelector } from "redux/selectors";

const useRefreshAccount = () => {
  const refetch = useSelector(refetchOriginSelector);
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);

  React.useEffect(() => {
    if (loggedIn) {
      refreshAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, loggedIn]);
};

export default useRefreshAccount;

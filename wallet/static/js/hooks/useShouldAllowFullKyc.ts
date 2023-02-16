import { useEffect, useState } from "react";
import { hooks } from "@elrondnetwork/dapp-core-internal";
import {
  useGetAccountInfo,
  useGetLoginInfo,
} from "@elrondnetwork/dapp-core/hooks";
import { formatAmount, parseAmount } from "@elrondnetwork/dapp-core/utils";
import BigNumber from "bignumber.js";
import { network } from "config";
import { useApiRequests } from "helpers";

export const useShouldAllowFullKyc = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const { address } = useGetAccountInfo();
  const { hasAccessToken, isTokenExpired, isLoading } =
    hooks.useGetIsAuthenticated(address, network.maiarIdApi);
  const { getStakedAmount } = useApiRequests();

  const [shouldAllowFullKyc, setShouldAllowFullKyc] = useState(false);
  const [fullKycDataLoaded, setFullKycDataLoaded] = useState(false);

  const loadStakeData = async () => {
    const stakedAmount = await getStakedAmount();
    if (stakedAmount.success) {
      setFullKycDataLoaded(false);

      setShouldAllowFullKyc(
        new BigNumber(stakedAmount.data.stake).isGreaterThanOrEqualTo(
          new BigNumber(parseAmount("100")),
        ),
      );

      return;
    }

    setFullKycDataLoaded(false);
  };

  useEffect(() => {
    if (hasAccessToken && isLoggedIn && !isTokenExpired && !fullKycDataLoaded) {
      loadStakeData();
    } else {
      setFullKycDataLoaded(false);
    }
  }, [isLoading, hasAccessToken, isTokenExpired]);

  return { shouldAllowFullKyc };
};

import {
  DIGITS as digits,
  DECIMALS as decimals,
} from "@elrondnetwork/dapp-core/constants";
import { formatAmount } from "@elrondnetwork/dapp-core/utils";
import { tiers, TierType } from "config";
import { useApiRequests } from "helpers";
import { TicketsDataType } from "../Tickets";

export const useGetTier = () => {
  const { getStakedAmount } = useApiRequests();

  const getTierByTicketData = (
    ticketsData: TicketsDataType,
  ): TierType | undefined => {
    const tickets = [];
    let from = parseInt(ticketsData.ticketEntries[0]);
    const to = parseInt(ticketsData.ticketEntries[1]);
    for (from; from <= to; from++) {
      tickets.push(from);
    }

    for (const tier of tiers) {
      if (tickets.length === tier.tickets) return tier;
    }
  };
  const getTierByStakedAmoutn = async () => {
    const totalStakedResponse = await getStakedAmount();
    let stakedAmount = "0";
    if (totalStakedResponse?.success) {
      stakedAmount = totalStakedResponse?.data.stake;
    }

    const denominatedStakedAmount = formatAmount({
      input: stakedAmount,
      digits,
      decimals,
      showLastNonZeroDecimal: true,
      addCommas: false,
    });
    for (const tier of tiers) {
      if (parseFloat(denominatedStakedAmount) >= tier.minimumStaked) {
        if (tier.number !== 1) {
          const nextTier = tiers[tier.number - 2];
          tier.egldNextTier = parseFloat(
            (
              nextTier.minimumStaked - parseFloat(denominatedStakedAmount)
            ).toFixed(2),
          );
        }
        return tier;
      }
    }
  };

  return { getTierByStakedAmoutn, getTierByTicketData };
};

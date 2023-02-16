import * as React from "react";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/pro-regular-svg-icons/faChevronUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CollapsibleArrows = ({
  expanded,
  size = "sm",
}: {
  expanded: boolean;
  size?: "sm" | "xs";
}) => {
  return (
    <FontAwesomeIcon
      className="text-primary-highlight"
      size={size}
      icon={expanded ? faChevronUp : faChevronDown}
    />
  );
};

export default CollapsibleArrows;

import * as React from "react";
import { faCheck } from "@fortawesome/pro-regular-svg-icons/faCheck";
import { faCopy } from "@fortawesome/pro-regular-svg-icons/faCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copyTextToClipboard from "./helpers/copyToClipboard";

interface CopyButtonType {
  text: string;
  className?: string;
}

const CopyButton = ({ text, className = "" }: CopyButtonType) => {
  const [copyResult, setCopyResut] = React.useState({
    default: true,
    success: false,
  });

  const handleCopyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const noSpaces = text ? text.trim() : text;
    setCopyResut({
      default: false,
      success: await copyTextToClipboard(noSpaces),
    });

    setTimeout(() => {
      setCopyResut({
        default: true,
        success: false,
      });
    }, 1000);
  };

  return (
    <a
      href="/#"
      onClick={handleCopyToClipboard}
      className={`side-action text-secondary ${className}`}
    >
      {copyResult.default || !copyResult.success ? (
        <FontAwesomeIcon icon={faCopy} />
      ) : (
        <FontAwesomeIcon icon={faCheck} className="text-primary" />
      )}
    </a>
  );
};

export default CopyButton;

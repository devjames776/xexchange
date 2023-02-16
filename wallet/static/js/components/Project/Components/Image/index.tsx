import * as React from "react";
import { mediaAddress } from "config";

const Image = ({
  data,
  rounded,
  className,
}: {
  data: any;
  rounded?: boolean;
  className?: string;
}) => {
  const image = data?.data?.attributes;

  if (!image) {
    return null;
  }

  const url = `${mediaAddress}/${image.hash}${image.ext}`;

  return (
    <img
      className={`img-fluid ${rounded ? "rounded" : ""} ${className ?? ""}`}
      src={url}
      alt={image.hash}
    />
  );
};

export default Image;

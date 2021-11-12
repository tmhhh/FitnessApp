import React from "react";
import { Image } from "react-bootstrap";

export default function Thumbnail({ url }) {
  return (
    <>
      <Image style={{ width: "8rem", height: "8rem" }} src={url} thumbnail />
    </>
  );
}

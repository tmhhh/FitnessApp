import React from "react";
import { Image } from "react-bootstrap";

export default function Thumbnail({ url }) {
  return (
    <>
      <Image style={{ width: "100px", height: "100px" }} src={url} thumbnail />
    </>
  );
}

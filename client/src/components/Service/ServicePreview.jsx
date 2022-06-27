import React from "react";
import { Badge, Image } from "react-bootstrap";
import { fetchPostImage, fetchUserImage } from "../../assets/constants";
import QRCode from "react-qr-code";

export default function ServicePreview({ service }) {
  return (
    <>
      <div className="postPreviewContainer ">
        <Image
          style={{ height: "200px", width: "100%" }}
          src={fetchPostImage()}
          rounded
          fluid
        />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>{service.name}</h1>
            <h4>{service.vendor}</h4>
          </div>
          <div>
            <h4 style={{ color: "#00ed37" }}>{service.price}$</h4>
          </div>
        </div>
      </div>
      {/* <div>
        <QRCode value="Hello world" />
      </div> */}
    </>
  );
}

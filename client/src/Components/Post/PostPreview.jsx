import React from "react";
import { Image, Button } from "react-bootstrap";
import { fetchPostImage, fetchUserImage } from "../../assets/constants";

import "./style.scss";

export default function PostPreview({ post }) {
  return (
    <>
      <div className="postPreviewContainer">
        <div>
          <div className="d-flex align-items-center">
            <Image
              style={{ width: "50px", height: "50px" }}
              src={fetchUserImage(post.author?.userImage)}
              roundedCircle
              thumbnail
            />
            <h6 className="ms-2">{post.author?.userName}</h6>
          </div>
        </div>
        <h3 className="mt-2">{post.title}</h3>
        <span style={{ color: "grey" }}>{post.updatedAt}</span>
        <Image
          style={{ height: "200px", width: "100%" }}
          src={fetchPostImage(post.thumbnail)}
          rounded
          fluid
        />
        <div
          className="d-flex justify-content-center mt-4 "
          style={{ height: "30px" }}
        >
          <button className="button3D">☝</button>
          <button className="button3D">💬</button>
          <button className="button3D">📖</button>
        </div>
      </div>
    </>
  );
}

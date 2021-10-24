import React from "react";
import { Badge, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchPostImage, fetchUserImage } from "../../assets/constants";
import { likePost } from "../../redux/slices/postSlice";

import "./style.scss";

export default function PostPreview({ post, handleShowConfirm }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.userInfo);
  const onEditClick = (e) => {
    e.stopPropagation();
    history.push(`/edit-post/${post._id}`);
  };
  const onRemoveClick = (e) => {
    e.stopPropagation();
    handleShowConfirm(post._id);
  };
  const onLikeClick = (e) => {
    e.stopPropagation();
    dispatch(likePost(post._id));
  };
  const onCmtClick = async (e) => {};
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
            <h6 style={{ color: "grey" }} className="ms-2">
              {post.author?.userName}
            </h6>
          </div>
        </div>
        <h6 className="mt-2">{post.title}</h6>
        <span style={{ color: "grey" }}>{post.createdAt}</span>
        <Image
          style={{ height: "200px", width: "100%" }}
          src={fetchPostImage(post.thumbnail)}
          rounded
          fluid
        />
        <div className="d-flex justify-content-center mt-1">
          <Badge pill bg="dark" text="light">
            {post.like?.count} voted
          </Badge>
        </div>
        <div
          className="d-flex justify-content-center mt-4 "
          style={{ height: "30px" }}
        >
          <button
            className="button3D"
            style={{ margin: "auto" }}
            onClick={onLikeClick}
          >
            ☝
          </button>
          <button
            className="button3D"
            style={{ margin: "auto" }}
            onClick={onCmtClick}
          >
            💬
          </button>
          <button className="button3D" style={{ margin: "auto" }}>
            📖
          </button>
        </div>

        {/* EDIT POST */}
        {user?._id === post.author?._id && (
          <>
            <div className="operation d-flex">
              <div className="edit-btn" onClick={onEditClick}>
                <span>✍</span>
              </div>
              <div className="edit-btn" onClick={onRemoveClick}>
                <span>🗑</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

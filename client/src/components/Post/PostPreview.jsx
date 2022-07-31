import { Badge, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchPostImage, fetchUserImage } from "../../assets/constants";
import { likePost, unLikePost } from "../../redux/slices/postSlice";

import "./style.scss";

export default function PostPreview({ post, handleShowConfirm, isYourPost }) {
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
  const onUnLikeClick = (e) => {
    e.stopPropagation();
    dispatch(unLikePost(post._id));
  };
  const onCmtClick = async (e) => {};

  return (
    <>
      <div className="postPreviewContainer">
        <Image
          style={{
            height: "200px",
            width: "100%",
            objectFit: "cover",
            marginBottom: "40px",
          }}
          src={fetchPostImage(post.thumbnail)}
          rounded
          fluid
        />

        <div className="d-flex align-items-center justify-content-between">
          <h3
            style={{
              textTransform: "uppercase",
              fontSize: "2rem",
              fontWeight: 700,
              height: "25px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {post.title}
          </h3>
          {isYourPost && (
            <div style={{ fontSize: 12 }}>
              {post.status === "approved" ? (
                <Badge pill bg="success">
                  Approved
                </Badge>
              ) : post.status === "rejected" ? (
                <Badge pill bg="danger">
                  Rejected
                </Badge>
              ) : (
                <Badge pill bg="primary">
                  Pending
                </Badge>
              )}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }} className="body">
          <div
            style={{ marginRight: "20px" }}
            className="d-flex align-items-center"
          >
            <Image
              style={{ width: "50px", height: "50px" }}
              src={fetchUserImage(post.author?.userImage)}
              roundedCircle
              thumbnail
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h3 style={{ color: "grey", fontSize: "1.5rem" }}>
                {post.author?.userName}
              </h3>
              <Badge style={{ fontSize: "1rem" }} pill bg="dark" text="light">
                {post.like?.count} voted
              </Badge>
            </div>
          </div>
          <span
            style={{
              display: "block",
              position: "absolute",
              right: "10px",
              top: "285px",
              fontWeight: 500,
              fontSize: "1.3rem",
              color: "#999",
            }}
          >
            ({new Date(post.createdAt).toLocaleDateString()})
          </span>
          <div
            style={{
              position: "absolute",
              bottom: "3px",
              right: "15px",
            }}
            className="d-flex mt-4 "
          >
            {post.like?.user?.includes(user._id) ? (
              <button
                className="default-button default-danger py-2"
                onClick={onUnLikeClick}
              >
                <ion-icon
                  style={{ fontSize: "1.5rem" }}
                  name="thumbs-down-outline"
                ></ion-icon>
              </button>
            ) : (
              <button
                className="default-button py-2"
                style={{ margin: "auto" }}
                onClick={onLikeClick}
              >
                <ion-icon
                  style={{ fontSize: "1.5rem" }}
                  name="thumbs-up-outline"
                ></ion-icon>
              </button>
            )}
            {/* <button
              className="default-button"
              style={{ margin: "auto" }}
              onClick={onCmtClick}
            >
              <ion-icon
                style={{ fontSize: "1.5rem" }}
                name="clipboard-outline"
              ></ion-icon>
            </button> */}
          </div>
          {/* <div className="content">
            {post.}
          </div> */}
          {/* EDIT POST */}
          {user?._id === post.author?._id && (
            <>
              <div className="operation d-flex">
                <div className="edit-btn" onClick={onEditClick}>
                  <ion-icon
                    style={{ fontSize: "1.5rem" }}
                    name="settings-outline"
                  ></ion-icon>
                </div>
                <div className="edit-btn" onClick={onRemoveClick}>
                  <ion-icon
                    style={{ fontSize: "1.5rem" }}
                    name="trash-outline"
                  ></ion-icon>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

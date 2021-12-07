import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import PostContainer from "../../Post/PostContainer";
import {
  getAvailablePosts,
  getPostsByAuthor,
} from "../../../redux/slices/postSlice";
import { Helmet } from "react-helmet";
export default function BlogPage() {
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.postReducer.listPost);
  const history = useHistory();
  const [isAll, setIsAll] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(getAvailablePosts());
    })();
  }, [dispatch]);
  const fetchYourPost = async () => {
    await dispatch(getPostsByAuthor());
    setIsAll(false);
  };
  const onSeeAll = async () => {
    await dispatch(getAvailablePosts());
    setIsAll(true);
  };
  return (
    <>
      <div
        style={{ marginTop: "60px" }}
        className="d-flex blog__page__container"
      >
        <Helmet>
          <title>Blog</title>
          <meta name="description" content="Place to show your knowledge" />
        </Helmet>
        <div
          className="blog__page__sidebar"
          style={{
            padding: "20px",
            width: "25%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              padding: "10px 0",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "20px",
              borderTop: "1px solid black",
            }}
          >
            BLOG
          </h3>
          <p
            style={{
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              color: "#999",
              margin: "0 0 10px 20px",
            }}
            className="d-flex align-items-center"
            onClick={() => {
              history.push("/create-post");
            }}
          >
            <ion-icon
              style={{ fontSize: "2rem", marginRight: "10px" }}
              name="pencil-outline"
            ></ion-icon>{" "}
            Write your posts
          </p>
          {!isAll && (
            <p
              style={{
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: 500,
                color: "#999",
                margin: "0 0 10px 80px",
              }}
              className="d-flex align-items-center"
              onClick={onSeeAll}
            >
              See all
            </p>
          )}
          <p
            style={{
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              color: "#999",
              margin: "0 0 10px 20px",
            }}
            className="d-flex align-items-center"
            onClick={fetchYourPost}
          >
            <ion-icon
              style={{ fontSize: "2rem", marginRight: "10px" }}
              name="newspaper-outline"
            ></ion-icon>{" "}
            Your posts{" "}
          </p>
        </div>
        <PostContainer listPost={listPost} />
      </div>
    </>
  );
}

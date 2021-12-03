import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostContainer from "../../Post/PostContainer";
import {
  getAvailablePosts,
  getPostsByAuthor,
} from "../../../redux/slices/postSlice";
export default function BlogPage() {
import { Helmet } from "react-helmet";
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
        className="d-flex align-items-center justify-content-between "
      >
        <Helmet>
          <title>Blog</title>
          <meta name="description" content="Place to show your knowledge" />
        </Helmet>
        <div>
          <button
            className="button3D p-3"
            style={{ width: "fit-content", border: "3px solid black" }}
            onClick={() => {
              history.push("/create-post");
            }}
          >
            Write your posts ⚡
          </button>
          {!isAll && (
            <button
              className="button3D p-3 ms-2"
              style={{
                width: "fit-content",
                border: "3px solid black",
                backgroundColor: "#a3fff4",
              }}
              onClick={onSeeAll}
            >
              See all
            </button>
          )}
        </div>
        <button
          className="button3D p-3"
          style={{
            width: "fit-content",
            border: "3px solid black",
            fontSize: "18px",
            height: "70px",
            backgroundColor: "#d6bcff",
          }}
          onClick={fetchYourPost}
        >
          Your posts 😍
        </button>
      </div>
      <PostContainer listPost={listPost} />
    </>
  );
}

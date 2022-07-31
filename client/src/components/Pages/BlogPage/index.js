import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAvailablePosts,
  getPostsByAuthor,
} from "../../../redux/slices/postSlice";
import PostContainer from "../../Post/PostContainer";

export default function BlogPage() {
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.postReducer.listPost);
  const history = useHistory();
  const [isAll, setIsAll] = useState(true);
  const [isYourPost, setIsYourPost] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getAvailablePosts());
    })();
  }, [dispatch]);
  const fetchYourPost = async () => {
    await dispatch(getPostsByAuthor());
    setIsYourPost(true);
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
          <p
            style={{
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              color: "#999",
              margin: "0 0 10px 20px",
              borderRadius: "5px",
            }}
            className="d-flex align-items-center common-hover p-3"
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
          <p
            style={{
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              color: "#999",
              margin: "0 0 10px 20px",
              borderRadius: "5px",
            }}
            className="d-flex align-items-center common-hover p-3"
            onClick={fetchYourPost}
          >
            <ion-icon
              style={{ fontSize: "2rem", marginRight: "10px" }}
              name="newspaper-outline"
            ></ion-icon>{" "}
            Your posts{" "}
          </p>
          {!isAll && (
            <p
              style={{
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: 500,
                color: "#999",
                margin: "0 0 10px 80px",
                borderRadius: "5px",
              }}
              className="d-flex align-items-center  common-hover p-3"
              onClick={onSeeAll}
            >
              See all
            </p>
          )}
        </div>
        <PostContainer listPost={listPost} isYourPost={isYourPost} />
      </div>
    </>
  );
}

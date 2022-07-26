import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createPost, editPost } from "../../redux/slices/postSlice";
import PostForm from "./PostForm";

const initialValues = {
  title: "",
  hashtag: [],
  thumbnail: "",
  thumbnailFile: "",
  content: {},
};
export default function PostCrud({ postId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef(null);
  const [post, setPost] = useState(initialValues);
  const listPost = useSelector((state) => state.postReducer?.listPost);
  useEffect(() => {
    if (postId) {
      const post = listPost.find((post) => post._id === postId);
      setPost(post);
    }
  }, [listPost, postId]);
  const onSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  const handleSubmit = async (body) => {
    if (postId) {
      await dispatch(editPost({ postId, body }));
      history.push("/blog");
    } else {
      await dispatch(createPost(body));
      history.push("/blog");
    }
  };
  return (
    <>
      <Container
        style={{ marginTop: "200px", marginBottom: "100px", width: "900px" }}
      >
        <div className="d-flex justify-content-between">
          {postId ? (
            <h1> 📝 Change for the new things</h1>
          ) : (
            <h1> ✍ Write your post </h1>
          )}
          <div
            className="approve-section common-float"
            style={{
              top: "80px",
              bottom: "780px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>
              Publish your post{" "}
              <i
                className="fas fa-check-circle"
                style={{ color: "#55bb55" }}
              ></i>{" "}
            </h2>
            <div className="d-flex justify-content-end mt-4">
              <button
                className="common-button common-button-blue"
                style={{ borderRadius: "5px", height: "40px", width: "100px" }}
                onClick={onSubmit}
              >
                <i className="far fa-paper-plane"></i> Publish
              </button>
            </div>
          </div>
        </div>
        <hr />
        <PostForm
          innerRef={formRef}
          handleSubmit={handleSubmit}
          initialValues={post}
        />
      </Container>
    </>
  );
}

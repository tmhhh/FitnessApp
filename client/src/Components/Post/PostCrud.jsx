import React, { useEffect, useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import PostForm from "./PostForm";
import { useDispatch, useSelector } from "react-redux";
import { createPost, editPost } from "../../redux/slices/postSlice";
import { useHistory } from "react-router";

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
      history.push("/training");
    } else {
      await dispatch(createPost(body));
      history.push("/training");
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
          <Button
            variant="outline-primary"
            style={{ borderRadius: "10px" }}
            onClick={onSubmit}
          >
            <i className="far fa-paper-plane"></i> Publish
          </Button>
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

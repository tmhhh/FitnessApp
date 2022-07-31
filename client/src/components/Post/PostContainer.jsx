import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PostPreview from "./PostPreview";
import ConfirmModal from "../Common/ConfirmModal";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/slices/postSlice";

export default function PostContainer({ listPost, isYourPost }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [confirmShow, setConfirmShow] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);

  const handleCloseConfirm = () => setConfirmShow(false);
  const handleShowConfirm = (postId) => {
    setConfirmShow(true);
    setDeletePostId(postId);
  };
  const handleConfirm = async () => {
    await dispatch(deletePost(deletePostId));
    handleCloseConfirm();
  };
  return (
    <Container style={{ minHeight: "100vh", flex: 1 }} className="mt-5">
      <ConfirmModal
        show={confirmShow}
        handleConfirm={handleConfirm}
        handleClose={handleCloseConfirm}
        heading={<h3 style={{color: "red"}}>Delete your post 🗑</h3>}
      />
      <Row>
        {listPost.map((post) => (
          <Col
            style={{ marginBottom: "20px" }}
            key={post._id}
            xs={12}
            md={4}
            xl={4}
          >
            <div
              // style={{ cursor: "pointer" }}
              onClick={() => history.push(`/post/${post._id}`)}
            >
              <PostPreview post={post} handleShowConfirm={handleShowConfirm} isYourPost={isYourPost} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

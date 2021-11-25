import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PostPreview from "./PostPreview";
import ConfirmModal from "../Common/ConfirmModal";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/slices/postSlice";

export default function PostContainer({ listPost }) {
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
    <Container style={{ height: "100vh" }} className="mt-5">
      <ConfirmModal
        show={confirmShow}
        handleConfirm={handleConfirm}
        handleClose={handleCloseConfirm}
        heading={"Delete your post 📮"}
        body={"💪 Are you sure ?? "}
      />
      <Row className="justify-content-center">
        {listPost.map((post) => (
          <Col
            key={post._id}
            xxl={3}
            xl={4}
            md={6}
            xs={12}
            className="mb-5 d-flex justify-content-center"
          >
            <div onClick={() => history.push(`/post/${post._id}`)}>
              <PostPreview post={post} handleShowConfirm={handleShowConfirm} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

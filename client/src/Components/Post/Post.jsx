import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import postApi from "../../api/postApi";
import { fetchPostImage, fetchUserImage } from "../../assets/constants";
import { getPostById, getPostComments } from "../../redux/slices/postSlice";
import CommentForm from "./CommentForm";

export default function Post() {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [cmtModalShow, setCmtModalShow] = useState(false);
  useEffect(() => {
    (async () => {
      const rs = await dispatch(getPostById(postId));
      const post = unwrapResult(rs);
      setPost(post);
      await getComments();
    })();
  }, [postId, dispatch]);
  const getComments = async () => {
    const rs = await dispatch(getPostComments(postId));
    const comments = unwrapResult(rs);
    setComments(comments);
  };
  const handleCmtSubmit = async (content) => {
    const rs = await postApi.comment(postId, { content });
    if (rs.data.isSuccess) getComments();
  };
  if (!post) return <h1 className="mt-4"> loading</h1>;
  return (
    <>
      <Container fluid style={{ marginTop: "100px", marginBottom: "100px" }}>
        {/* <Row>
          <Col xs={3}></Col>
          <Col xs={6}> */}
        <Container
          style={{
            padding: "20px",
            width: "800px",
            borderRadius: "20px",
            boxShadow: "0 5px 15px 5px #f4f4f4",
          }}
        >
          <div>
            <h1 className="px-5">{post?.title}</h1>
            <div className="px-5">
              <Image
                style={{ height: "400px", width: "100%" }}
                src={fetchPostImage(post?.thumbnail)}
                rounded
                fluid
              />
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <div>
              <Image
                style={{ height: "100px", width: "100px" }}
                src={fetchUserImage(post?.author?.userImage)}
                roundedCircle
              />
            </div>
            <div className="ps-4">
              <h6>{post?.author?.userName}</h6>
              <span>Published on {post?.updatedAt}</span>
              <div>
                <a href="/" style={{ color: "grey" }}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="/" className="ms-2" style={{ color: "grey" }}>
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div dangerouslySetInnerHTML={{ __html: post?.content }} />
          </div>
        </Container>

        {/* Comments💬 */}
        <Container
          className="mt-5"
          style={{
            width: "800px",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center w-100"
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #c9c9c9",
            }}
          >
            <h5>comments({comments?.length})</h5>
            <Button variant="dark" onClick={() => setCmtModalShow(true)}>
              🖊 Add a comment
            </Button>
            <CommentModal
              show={cmtModalShow}
              onHide={() => setCmtModalShow(false)}
              handleSubmit={handleCmtSubmit}
            />
          </div>

          {comments &&
            comments.map((comment) => (
              <div
                key={comment._id}
                style={{
                  padding: "20px",
                  marginTop: "20px",
                  borderRadius: "10px",
                  border: "1px solid #eeeeee",
                }}
              >
                <Row className="align-items-center">
                  <Col xs={1}>
                    <Image
                      src={fetchUserImage(comment.author?.userImage)}
                      roundedCircle
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Col>
                  <Col>
                    <h6>{comment.author?.userName}</h6>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={1}></Col>
                  <Col>
                    <p>{comment.content}</p>
                  </Col>
                </Row>
              </div>
            ))}
        </Container>
        {/* </Col>
          <Col xs={3}></Col>
        </Row> */}
      </Container>
    </>
  );
}
function CommentModal(props) {
  return (
    <Modal show={props.show} size="lg" centered>
      <Modal.Body>
        <CommentForm
          user={null}
          onHide={props.onHide}
          handleSubmit={props.handleSubmit}
        />
      </Modal.Body>
    </Modal>
  );
}

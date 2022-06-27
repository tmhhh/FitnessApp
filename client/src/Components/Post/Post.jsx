import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import postApi from "../../api/postApi";
import { fetchPostImage, fetchUserImage } from "../../assets/constants";
import { getPostById, getPostComments } from "../../redux/slices/postSlice";
import CommentForm from "./CommentForm";
import CustomLoading from "../Common/Placeholders/CustomLoading";

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
    console.log(comments);
  };
  const handleCmtSubmit = async (content) => {
    const rs = await postApi.comment(postId, { content });
    if (rs.data.isSuccess) getComments();
  };
  return (
    <div style={{minHeight: "calc(100vh - 60px)", marginTop: '30px'}}>
      {!post
          ? (<CustomLoading className='loading-overlay'/>)
          : (
              <Container fluid style={{ marginTop: "100px", marginBottom: "100px"}}>
                {/* <Row>
          <Col xs={3}></Col>
          <Col xs={6}> */}
                <Container
                    style={{
                      padding: "20px",
                      width: "800px",
                      borderRadius: "20px",
                      boxShadow: "0 5px 15px 5px #f4f4f4",
                      backgroundColor: "white",
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
                  <div className=" ql-editor">
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
                    <button className="common-button floatButton" onClick={() => setCmtModalShow(true)}>
                      🖊 Add a comment
                    </button>
                    <CommentModal
                        show={cmtModalShow}
                        onHide={() => setCmtModalShow(false)}
                        handleSubmit={handleCmtSubmit}
                    />
                  </div>

                  {comments &&
                      comments.map((comment) => (
                          <Comment
                              key={comment._id}
                              comment={comment}
                              getComments={getComments}
                          />
                      ))}
                </Container>
                {/* </Col>
          <Col xs={3}></Col>
        </Row> */}
              </Container>
          )}

    </div>
  );
}

function Comment({ comment, getComments }) {
  const [replyTextShow, setReplyTextShow] = useState(false);
  const handleReply = async (content) => {
    setReplyTextShow(false);
    const rs = await postApi.reply(comment._id, { content });
    if (rs.data.isSuccess) getComments();
  };
  return (
    <div
      style={{
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
        border: "1px solid #eeeeee",
      }}
    >
      <Row>
        <Col xs={1}>
          <Image
            src={fetchUserImage(comment.author?.userImage)}
            roundedCircle
            style={{ width: "50px", height: "50px" }}
          />
        </Col>
        <Col>
          <div className="d-flex align-items-center" style={{ height: "50px" }}>
            <h6>{comment.author?.userName}</h6>
          </div>
          <p className="mt-3">{comment.content}</p>
          <hr />
          {comment.replies?.map((reply) => (
            <Row key={reply._id}>
              <Col xs={1}>
                <Image
                  src={fetchUserImage(reply.author?.userImage)}
                  roundedCircle
                  style={{ width: "50px", height: "50px" }}
                />
              </Col>
              <Col>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "50px" }}
                >
                  <h6>{reply.author?.userName}</h6>
                </div>
                <p className="mt-3">{reply.content}</p>
              </Col>
            </Row>
          ))}
          <Row className="align-items-end">
            <Col xs={10}>
              {replyTextShow && (
                <ReplyText
                  handleReply={handleReply}
                  onHide={() => {
                    setReplyTextShow(false);
                  }}
                />
              )}
            </Col>
            <Col className="p-0">
              <button
                className=" default-outline-button default-primary mt-3"
                style={{ fontSize: "14px"}}
                onClick={() => setReplyTextShow(true)}
              >
                <i className="far fa-comment-dots"></i> Reply
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
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

function ReplyText(props) {
  const [reply, setReply] = useState("");
  const onReplyChange = (e) => {
    setReply(e.target.value);
  };
  const onSubmit = async () => {
    await props.handleReply(reply);
  };
  return (
    <>
      <div className="d-flex align-items-end">
        <input
          type="text"
          className="default-input w-100"
          placeholder="Reply....."
          onChange={onReplyChange}
          value={reply}
        ></input>
        <button
          className="default-button default-primary"
          style={{ fontSize: "12px", border: "none" }}
          onClick={onSubmit}
        >
          <i className="far fa-paper-plane"></i>
        </button>
        <button
          className="default-button ms-1"
          style={{ fontSize: "14px" }}
          onClick={props.onHide}
        >
          Dismiss
        </button>
      </div>
    </>
  );
}

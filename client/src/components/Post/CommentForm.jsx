import React, { useState } from "react";
import { FloatingLabel, Button, Form, Image } from "react-bootstrap";
import { fetchUserImage } from "../../assets/constants";

export default function CommentForm({ user, onHide, handleSubmit }) {
  const [comment, setComment] = useState("");
  const onComment = (e) => {
    setComment(e.target.value);
  };
  const onSubmit = async () => {
    await handleSubmit(comment);
    onHide();
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h4>What do you think about this article?</h4>
          <p style={{ color: "grey" }}>
            Add the comment to let the author know
          </p>
        </div>
        <div className="d-flex align-items-center">
          <Image
            src={fetchUserImage(user?.userImage)}
            roundedCircle
            style={{ width: "50px", height: "50px" }}
          />
          <span style={{ fontSize: "40px" }}>💬</span>
        </div>
      </div>
      <div className="mt-4">
        <FloatingLabel controlId="floatingTextarea2" label="Your comment 📝">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "200px" }}
            onChange={onComment}
          />
        </FloatingLabel>
      </div>
      <div
        className=" d-flex justify-content-between align-items-center"
        style={{ marginTop: "200px" }}
      >
        <button className="default-button" onClick={onHide}>
          Dismiss
        </button>
        <button className="common-button common-button-blue" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

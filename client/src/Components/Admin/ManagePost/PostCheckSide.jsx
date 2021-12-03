import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { editPost } from "../../../redux/slices/postSlice";
import ConfirmModal from "../../Common/ConfirmModal";
import Post from "../../Post/Post";

export default function PostCheckSide() {
  const history = useHistory();
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const [approveConfirmShow, setApproveConfirmShow] = useState(false);
  const [rejectConfirmShow, setRejectConfirmShow] = useState(false);

  const handleCloseApproveConfirm = () => setApproveConfirmShow(false);
  const handleCloseRejectConfirm = () => setRejectConfirmShow(false);

  const handleAccept = async () => {
    await dispatch(editPost({ postId, body: { status: "approved" } }));
    handleCloseApproveConfirm();
    history.push("/admin/post");
  };
  const handleReject = async () => {
    await dispatch(editPost({ postId, body: { status: "rejected" } }));
    handleCloseRejectConfirm();
    history.push("/admin/post");
  };
  return (
    <>
      <ConfirmModal
        show={approveConfirmShow}
        handleConfirm={handleAccept}
        handleClose={handleCloseApproveConfirm}
        heading={"Approve this post 📮"}
        body={"💪 Are you sure ?? "}
      />
      <ConfirmModal
        show={rejectConfirmShow}
        handleConfirm={handleReject}
        handleClose={handleCloseRejectConfirm}
        heading={"Reject this post 📮"}
        body={"💪 Are you sure ?? "}
      />
      <Button onClick={() => setApproveConfirmShow(true)}>Accept</Button>
      <Button variant="danger" onClick={() => setRejectConfirmShow(true)}>
        Reject
      </Button>
      <Post />
    </>
  );
}

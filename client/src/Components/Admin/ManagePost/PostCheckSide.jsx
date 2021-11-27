import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { editPost } from "../../../redux/slices/postSlice";
import Post from "../../Post/Post";

export default function PostCheckSide() {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const handleAccept = async () => {
    await dispatch(editPost({ postId, body: { status: "accepted" } }));
  };
  const handleReject = async () => {
    await dispatch(editPost({ postId, body: { status: "rejected" } }));
  };
  return (
    <div>
      <Button onClick={handleAccept}>Accept</Button>
      <Button variant="danger" onClick={handleReject}>
        Reject
      </Button>
      <Post />
    </div>
  );
}

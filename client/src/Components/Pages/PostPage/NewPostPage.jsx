import React from "react";
import { useSelector } from "react-redux";
import LoadingLayer from "../../Common/LoadingLayer";
import PostCrud from "../../Post/PostCrud";

export default function NewPostPage() {
  const loading = useSelector((state) => state?.PostReducer?.postLoading);
  return (
    <div>
      <LoadingLayer show={loading} />
      <PostCrud />
    </div>
  );
}

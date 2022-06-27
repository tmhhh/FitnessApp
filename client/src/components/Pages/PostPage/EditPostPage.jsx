import React from "react";
import { useParams } from "react-router";
import PostCrud from "../../Post/PostCrud";

export default function EditPostPage() {
  const { postId } = useParams();
  return (
    <div>
      <PostCrud postId={postId} />
    </div>
  );
}

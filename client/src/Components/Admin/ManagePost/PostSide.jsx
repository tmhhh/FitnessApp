import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchPostImage } from "../../../assets/constants";
import { getPosts } from "../../../redux/slices/postSlice";
import Thumbnail from "../../Common/Thumbnail";

export default function PostSide() {
  const history = useHistory();
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.postReducer.listPost);
  useEffect(() => {
    (async () => {
      await dispatch(getPosts());
    })();
  }, [dispatch]);
  return (
    <div>
      <Table
        responsive
        striped
        bordered
        hover
        className="text-center align-middle"
      >
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Author</th>
            <th>Submitted Date</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {listPost.map(
            (post) =>
              post.status === "pending" && (
                <tr key={post._id}>
                  <td>
                    <Thumbnail url={fetchPostImage(post.thumbnail)} />
                  </td>
                  <td>{post.title}</td>
                  <td>{post.author?.userName}</td>
                  <td>{post.createdAt}</td>

                  <td>
                    <button
                      className="default-button default-primary"
                      onClick={() => history.push(`/admin/post/${post._id}`)}
                    >
                      Check 📬
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
    </div>
  );
}

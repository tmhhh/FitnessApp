import { useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchPostImage } from "../../../../assets/constants";
import { getPostsByAuthor } from "../../../../redux/slices/postSlice";
import Thumbnail from "../../../Common/Thumbnail";

export default function UserPost() {
  const history = useHistory();
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.postReducer.listPost);
  const [status, setStatus] = useState("all");

  useEffect(() => {
    (async () => {
      await dispatch(getPostsByAuthor());
    })();
  }, [dispatch]);
  return (
    <>
      <div className="w-100 mt-4">
        <div className="w-100 ">
          <Badge
            bg="dark"
            className="badge-btn ms-3"
            onClick={() => setStatus("all")}
          >
            {status === "all" && "👉 "}
            All
          </Badge>
          <Badge
            bg="primary"
            className="badge-btn ms-3"
            onClick={() => setStatus("pending")}
          >
            {status === "pending" && "👉 "}
            Pending
          </Badge>
          <Badge
            bg="success"
            className="badge-btn ms-3"
            onClick={() => setStatus("approved")}
          >
            {status === "approved" && "👉 "}
            Approved
          </Badge>

          <Badge
            bg="danger"
            className="badge-btn ms-3"
            onClick={() => setStatus("rejected")}
          >
            {status === "rejected" && "👉 "}
            Rejected
          </Badge>
        </div>
        <Table
          striped
          bordered
          hover
          className="text-center align-middle mt-4 h-50"
        >
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Author</th>
              <th>Submitted Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listPost.map(
              (post) =>
                (post.status === status || status === "all") && (
                  <tr
                    key={post._id}
                    onClick={() => history.push(`/post/${post._id}`)}
                  >
                    <td>
                      <Thumbnail url={fetchPostImage(post.thumbnail)} />
                    </td>
                    <td>{post.title}</td>
                    <td>{post.author?.userName}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td>
                      {post.status === "approved" ? (
                        <Badge pill bg="success">
                          Approved
                        </Badge>
                      ) : post.status === "rejected" ? (
                        <Badge pill bg="danger">
                          Rejected
                        </Badge>
                      ) : (
                        <Badge pill bg="primary">
                          Pending
                        </Badge>
                      )}
                    </td>
                  </tr>
                )
            )}
            {listPost.length <= 0 && (
              <tr>
                <td style={{ fontSize: "50px" }} colSpan="5">
                  No posts here -{" "}
                  <a
                    href="#new-post"
                    onClick={() => history.push(`/create-post`)}
                  >
                    Create your post now
                  </a>{" "}
                </td>{" "}
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

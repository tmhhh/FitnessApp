import { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchPostImage } from "../../../assets/constants";
import { getPosts } from "../../../redux/slices/postSlice";
import Thumbnail from "../../Common/Thumbnail";

export default function PostSide() {
  const history = useHistory();
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.postReducer.listPost).filter(
    (post) => post.status === "pending"
  );
  useEffect(() => {
    (async () => {
      await dispatch(getPosts());
    })();
  }, [dispatch]);

  return (
    <Container className="admin-container mt-5">
      <div className="admin-content">
        <h2 className="admin-content-title">Manage Post</h2>
        <Table
          responsive
          bordered
          hover
          className="text-center align-middle mt-5"
        >
          <thead style={{ fontSize: "24px" }}>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Author</th>
              <th>Submitted Date</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {listPost.map((post) => (
              <tr key={post._id}>
                <td>
                  <Thumbnail url={fetchPostImage(post.thumbnail)} />
                </td>
                <td>{post.title}</td>
                <td>{post.author?.userName}</td>
                <td>{post.createdAt}</td>

                <td>
                  <button
                    className="common-outline-button common-outline-button-blue"
                    onClick={() => history.push(`/admin/post/${post._id}`)}
                    style={{ width: "100px", height: "40px", fontSize: "14px" }}
                  >
                    Check 📬
                  </button>
                </td>
              </tr>
            ))}
            {listPost.length <= 0 && (
              <tr>
                <td style={{ color: "#c9c9c9", height: "75vh" }} colSpan="5">
                  <i className="fas fa-paste" style={{ fontSize: "150px" }}></i>
                  <h2>No posts in pending queue</h2>
                </td>{" "}
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

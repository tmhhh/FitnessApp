import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchPostImage, fetchUserImage } from "../../assets/constants";

export default function Post() {
  const postId = useParams().postId;
  const listPost = useSelector((state) => state.postReducer.listPost);
  const [post, setPost] = useState({});
  useEffect(() => {
    const post = listPost.find((post) => post._id === postId);
    setPost(post);
  }, [listPost, postId]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Container
              style={{
                padding: "20px",
                marginTop: "100px",
                marginBottom: "100px",
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
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Container>
    </>
  );
}

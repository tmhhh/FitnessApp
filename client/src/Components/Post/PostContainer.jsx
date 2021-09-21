import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostPreview from "./PostPreview";

export default function PostContainer({ listPost }) {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {listPost.map((post) => (
          <Col
            key={post._id}
            xxl={3}
            xl={4}
            md={6}
            xs={12}
            className="mb-5 d-flex justify-content-center"
          >
            <Link to={`/post/${post._id}`}>
              <PostPreview post={post} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import ServicePreview from "./ServicePreview";

export default function ServiceContainer({ listServices }) {
  const history = useHistory();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {listServices.map((service) => (
          <Col
            key={service._id}
            xxl={3}
            xl={4}
            md={6}
            xs={12}
            className="mb-5 d-flex justify-content-center"
          >
            <div onClick={() => history.push(`/service/${service._id}`)}>
              <ServicePreview service={service} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

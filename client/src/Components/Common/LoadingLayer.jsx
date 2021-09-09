import React from "react";
import { Spinner } from "react-bootstrap";
import "./style.scss";

export default function LoadingLayer({ show }) {
  if (!show) return null;
  return (
    <div className="loading-overlay">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

import React from "react";
import { Form } from "react-bootstrap";
import "./style.scss";
export default function SearchBar() {
  const handleOnChange = () => {};
  return (
    <Form.Control
      onChange={handleOnChange}
      className="search_bar"
      type="text"
      placeholder="Search for food ..."
    />
  );
}

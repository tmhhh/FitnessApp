import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";

import { useState } from "react";

export default function DatePickerModal({
  datePickerModalShow,
  handleAddToTrainingSchedule,
  handleCloseDatePickerModal,
  show: { selectedExercise, isShow },
}) {
  const [date, setDate] = useState();
  const handleOnChange = (e) => {
    setDate(e);
  };
  return (
    <Modal
      centered
      show={datePickerModalShow}
      onHide={handleCloseDatePickerModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Choose your date</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DatePicker
          value={date}
          className="w-100"
          minDate={new Date()}
          // startDate={new Date()}
          onChange={handleOnChange}
          showTimeSelect
          selected={date}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() =>
            handleAddToTrainingSchedule(selectedExercise._id, date)
          }
          className="common-button common-button-blue"
        >
          Add
        </button>
        <button onClick={handleCloseDatePickerModal} className="common-button common-button-grey">
          Back
        </button>
      </Modal.Footer>
    </Modal>
  );
}

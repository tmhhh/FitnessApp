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
        <Button
          onClick={() =>
            handleAddToTrainingSchedule(selectedExercise._id, date)
          }
          variant="primary"
        >
          Add
        </Button>
        <Button onClick={handleCloseDatePickerModal} variant="secondary">
          Back
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

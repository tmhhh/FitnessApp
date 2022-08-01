import { Modal } from "react-bootstrap";

export default function ConfirmModal({
  show,
  handleClose,
  handleConfirm,
  heading,
  body,
}) {
  const defaultConfirmMessage = (
    <>
      <h1>Are you sure 🤔 ?</h1>
    </>
  );

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body || defaultConfirmMessage}</Modal.Body>
        <Modal.Footer>
          <button
            className="common-button common-button-red"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="common-outline-button common-outline-button-green"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

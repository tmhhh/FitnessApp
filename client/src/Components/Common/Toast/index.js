import React, { useContext } from "react";
import { Context } from "../../../Contexts";
import { Toast, ToastContainer } from "react-bootstrap";

export default function NotiToast() {
  const { toast, setToast } = useContext(Context);
  return (
    <ToastContainer
      position="bottom-end"
      style={{ zIndex: "1000" }}
      className="p-3 position-fixed "
    >
      <Toast
        bg={toast.bg}
        onClose={() => setToast({ ...toast, toastShow: false })}
        show={toast.toastShow}
        delay={3000}
        autohide
        animation={true}
      >
        <Toast.Header>
          {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
          <span>{toast.icon}</span>
          <strong className="me-auto">{toast.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{toast.content}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

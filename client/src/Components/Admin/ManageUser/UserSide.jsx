import Button from "@restart/ui/esm/Button";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import * as yup from "yup";
import ItemForm from "../ItemForm";
export default function UserSide() {
  //  const ManipulateProductModal = (props) => {
  //     const initialValues = {};
  //     const validationSchema = yup.object().shape({});
  //     const { handleAction, show, hide, itemID } = props;
  //     const [item, setItem] = useState({ initialValues });
  //     const formRef = useRef();

  //     //Get item by ID to fill all field (For update purpose)
  //     useEffect(() => {
  //       if (itemID) setItem(null);
  //     }, [itemID]);

  //     const handleSubmit = () => {
  //       if (formRef.current) {
  //         formRef.current.handleSubmit();
  //       }
  //     };
  //     return (
  //       <Modal show={show} onHide={hide} centered>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Change item 🛠</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <ItemForm
  //             innerRef={formRef}
  //             onSubmit={handleAction}
  //             initialValues={item}
  //             validationSchema={validationSchema}
  //           />
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="danger" onClick={hide}>
  //             Close
  //           </Button>
  //           {action === "add" ? (
  //             <Button variant="dark" onClick={handleSubmit}>
  //               Add 📥
  //             </Button>
  //           ) : (
  //             <Button variant="dark" onClick={handleSubmit}>
  //               Update 🔧
  //             </Button>
  //           )}
  //         </Modal.Footer>
  //       </Modal>
  //     );
  //   };
  return <div></div>;
}

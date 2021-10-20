// import React, { useEffect, useContext } from "react";
// import { useHistory } from "react-router";
// import Spinner from "react-bootstrap/Spinner";
// import checkOutApi from "../../../../api/checkoutApi";
// import { OrderContext } from "../../../../Contexts/OrderContext";
// export default function CheckoutPending() {
//   console.log("pending");
//   const history = useHistory();
//   const { formData } = useContext(OrderContext);

//   //SUBMIT ORDER
//   useEffect(() => {
//     const checkOut = async () => {
//       try {
//         console.log(formData.current);
//         const res = await checkOutApi.billCheckout({ ...formData.current });
//         if (res.data.isSuccess) history.push("/checkout/success");
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     checkOut();
//   });
//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       <Spinner animation="border" variant="info" />
//     </div>
//   );
// }

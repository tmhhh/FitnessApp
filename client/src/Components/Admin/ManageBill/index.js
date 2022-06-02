// import { useEffect, useState, useContext } from "react";
// import Table from "react-bootstrap/Table";
// import Form from "react-bootstrap/Form";
// import billApi from "../../../api/billApi";
// import { Context } from "../../../Contexts";
// import { formatCurrency } from "../../../utils/formatCurrency";
// export default function ManageBill() {
//   const { setToast } = useContext(Context);
//   const [listBills, setListBills] = useState([]);
//   const [limit, setLimit] = useState({
//     value: 1,
//     max: null,
//   });
//   const getBills = async () => {
//     try {
//       const res = await billApi.getBills(+limit.value);
//       if (res.data.isSuccess) {
//         console.log(res.data.foundBills);
//         setListBills(res.data.foundBills);
//       }
//     } catch (error) {
//       console.log({ error });
//     }
//   };
//   useEffect(() => {
//     (async () => {
//       const res = await billApi.getTotalNumbBills();
//       if (res.data.isSuccess) {
//         const max = Math.ceil(res.data.totalNumb / 5);
//         setLimit({ ...limit, max });

//         window.addEventListener("scroll", () => getBillsByLimit(max)); // console.log(tableWrapper.getBoundingClientRect().height + " height");
//       }
//     })();
//     // console.log(tableWrapper.getBoundingClientRect().top + " top");
//     // console.log(tableWrapper.getBoundingClientRect().bottom + " bottom");
//     // console.log(document.documentElement.clientHeight + " client height");
//     // console.log(tableWrapper.clientHeight + "client height 2"); // === tableWrapper.getBoundingCLientReact().height
//     // console.log(window.scrollY + "scroll y");
//     // console.log("------------------------------");
//     // console.log(
//     //   Math.round(
//     //     -tableWrapper.getBoundingClientRect().top +
//     //       document.documentElement.clientHeight -
//     //       20
//     //   )
//     // );
//     // console.log(Math.round(tableWrapper.clientHeight));
//     // console.log("-----------------");
//     return () => window.removeEventListener("scroll", getBillsByLimit);
//   }, []);

//   useEffect(() => {
//     getBills();
//   }, [limit]);

//   const getBillsByLimit = (max) => {
//     console.log({ max } + limit.value);
//     if (limit.value >= max) {
//       return;
//     }
//     const tableWrapper = document.querySelector("#table-wrapper");
//     try {
//       if (
//         Math.round(
//           -tableWrapper.getBoundingClientRect().top +
//             document.documentElement.clientHeight -
//             20
//         ) >= Math.round(tableWrapper.clientHeight)
//       ) {
//         setTimeout(() => {
//           // console.log("Call PI " + limit);
//           setLimit({ ...limit, value: limit.value + 1 }); //closure case
//         }, 2000);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleStatusChange = async (e, billID) => {
//     if (
//       e.target.value !==
//       listBills.find((e) => e._id.toString() === billID.toString()).status
//     ) {
//       // setShowConfirm(true);
//       try {
//         const res = await billApi.updateBillStatus(billID, e.target.value);
//         if (res.data.isSuccess) {
//           setListBills(
//             listBills.map((bill) => {
//               if (bill._id.toString() === billID.toString()) {
//                 return { ...bill, status: e.target.value };
//               } else return bill;
//             })
//           );
//           setToast({
//             toastShow: true,
//             title: "Successfully ...",
//             content: "Bill status has been updated",
//             icon: "✔",
//             bg: "success",
//           });
//         }
//       } catch (error) {
//         console.log({ error });
//         setToast({
//           toastShow: true,
//           title: "Failed ...",
//           content: "Please try a later",
//           icon: "❌",
//           bg: "danger",
//         });
//       }
//     }
//   };

//   const handleSortByStatus = async (e) => {
//     try {
//       if (e.target.value === "All") return getBills();
//       const res = await billApi.getBillsByStatus(e.target.value);
//       if (res.data.isSuccess) setListBills(res.data.foundBills);
//     } catch (error) {
//       console.log({ error });
//       setToast({
//         toastShow: true,
//         title: "Failed ...",
//         content: "Please try a later",
//         icon: "❌",
//         bg: "danger",
//       });
//     }
//   };

//   return (
//     <div
//     ref={tableRef}
//       id="table-wrapper"
//       style={{
//         width: "calc (100% - 20px)",
//         margin: "20px",
//         position: "relative",
//         minHeight: "100vh",
//       }}
//     >
//       <Form.Select
//         style={{
//           width: "200px",
//           position: "absolute",
//           right: "20px",
//           top: "0px",
//         }}
//         onChange={handleSortByStatus}
//       >
//         <option value="All">Sort by bill's status</option>
//         <option value="Pending">Pending</option>
//         <option value="Approved">Approved</option>
//         <option value="Done">Done</option>
//       </Form.Select>
//       {listBills.length > 0 &&
//         listBills.map((bill, index) => (
//           <div key={bill._id}>
//             <h3>
//               #{index + 1} ({new Date(bill.createdAt).toLocaleDateString()})
//             </h3>

//             <Table striped bordered hover className="mt-4 h-50 ">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Product Name</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Total Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bill.listItems?.map((item, index) => (
//                   <tr>
//                     <td>{index + 1}</td>
//                     <td>{item.product.prodName}</td>
//                     <td>{formatCurrency(item.product.prodPrice)}</td>
//                     <td>{item.quantity}</td>
//                     <td>
//                       {item.prodDiscount ? (
//                         <>
//                           <p
//                             style={{
//                               color: "#999",
//                               textDecoration: "line-through",
//                             }}
//                           >
//                             {formatCurrency(
//                               item.product.prodPrice * item.quantity
//                             )}
//                           </p>
//                           <p>
//                             {formatCurrency(
//                               item.product.prodPrice *
//                                 item.quantity *
//                                 (1 - item.prodDiscount / 100)
//                             )}
//                           </p>
//                         </>
//                       ) : (
//                         formatCurrency(item.quantity * item.product.prodPrice)
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td></td>
//                   <td></td>
//                   <td></td>

//                   <td>
//                     <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>User</p>
//                   </td>
//                   <td>
//                     <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
//                       {bill.user.userName} ({bill.user.userNameID})
//                     </p>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td></td>
//                   <td></td>
//                   <td></td>

//                   <td>
//                     <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>Total</p>
//                   </td>
//                   <td>
//                     <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
//                       {" "}
//                       {formatCurrency(
//                         bill.price.totalPrice - bill.price.shippingFee
//                       )}
//                       {bill.discountUsed && ` (-${bill.price.discount}%)`}{" "}
//                     </p>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td></td>
//                   <td></td>
//                   <td></td>

//                   <td>
//                     <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>
//                       Status
//                     </p>
//                   </td>
//                   <td>
//                     <Form.Select
//                       onChange={(e) => handleStatusChange(e, bill._id)}
//                     >
//                       <option
//                         selected={bill.status === "Pending" && true}
//                         value="Pending"
//                       >
//                         Pending
//                       </option>
//                       <option
//                         selected={bill.status === "Approved" && true}
//                         value="Approved"
//                       >
//                         Approved
//                       </option>
//                       <option
//                         selected={bill.status === "Done" && true}
//                         value="Done"
//                       >
//                         Done
//                       </option>
//                     </Form.Select>
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>
//           </div>
//         ))}
//     </div>
//   );
// }

import messageAntd, { messageTypes } from "Components/Common/Toast/message";
import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import billApi from "../../../api/billApi";
import { formatCurrency } from "../../../utils/formatCurrency";
export default function ManageBill() {
  const sortValue = useRef();
  const [listBills, setListBills] = useState([]);
  const tableRef = useRef(null);
  const limitRef = useRef({
    value: 1,
    max: null,
  });
  //GET DATA WHEN VISITING PAGE
  useEffect(() => {
    fetchBillData();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await billApi.getTotalNumbBills();
      if (res.data.isSuccess) {
        const max = Math.ceil(res.data.totalNumb / 5);
        limitRef.current = { ...limitRef.current, max };

        window.addEventListener("scroll", getBillsByLimit); // console.log(tableWrapper.getBoundingClientRect().height + " height");
      }
    })();
    // console.log(tableWrapper.getBoundingClientRect().top + " top");
    // console.log(tableWrapper.getBoundingClientRect().bottom + " bottom");
    // console.log(document.documentElement.clientHeight + " client height");
    // console.log(tableWrapper.clientHeight + "client height 2"); // === tableWrapper.getBoundingCLientReact().height
    // console.log(window.scrollY + "scroll y");
    // console.log("------------------------------");
    // console.log(
    //   Math.round(
    //     -tableWrapper.getBoundingClientRect().top +
    //       document.documentElement.clientHeight -
    //       20
    //   )
    // );
    // console.log(Math.round(tableWrapper.clientHeight));
    // console.log("-----------------");
    return () => window.removeEventListener("scroll", getBillsByLimit);
  }, []);

  const getBillsByLimit = () => {
    // console.log(
    //   limitRef.current.value,
    //   limitRef.current.max,
    //   sortValue.current
    // );
    if (
      limitRef.current.value >= limitRef.current.max &&
      sortValue.current !== "All"
    ) {
      return;
    }
    try {
      if (
        Math.round(
          -tableRef.current.getBoundingClientRect().top +
            document.documentElement.clientHeight -
            20
        ) >= Math.round(tableRef.current.clientHeight)
      ) {
        // setTimeout(() => {
        // setLimit({ ...limit, value: limit.value + 1 }); //closure case
        limitRef.current = {
          ...limitRef.current,
          value: limitRef.current.value + 1,
        };
        fetchBillData();
        // }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBillData = async () => {
    const res = await billApi.getBills(+limitRef.current.value);
    if (res.data.isSuccess) {
      // console.log(res.data.foundBills);
      setListBills(res.data.foundBills);
    }
  };
  const handleStatusChange = async (e, billID) => {
    const value = e.target.value;
    // console.log(e.target.value + "----------------1");
    if (
      e.target.value !==
      listBills.find((e) => e._id.toString() === billID.toString()).status
    ) {
      // setShowConfirm(true);
      try {
        // console.log(e.target.value + "----------------2");
        e.persist();

        const res = await billApi.updateBillStatus(billID, e.target.value);
        if (res.data.isSuccess) {
          const updatedBills = listBills.map((bill) => {
            if (bill._id.toString() === billID.toString()) {
              // console.log(e.target.value + "----------------3");
              return { ...bill, status: value };
            } else return bill;
          });
          setListBills(updatedBills);
          messageAntd(messageTypes.success, "Bill status has been updated");
        }
      } catch (error) {
        console.log({ error });
        messageAntd(messageTypes.error, "Please try again later");
      }
    }
  };

  const handleSortByStatus = async (e) => {
    try {
      sortValue.current = e.target.value;
      if (sortValue.current === "All") return fetchBillData();
      const res = await billApi.getBillsByStatus(sortValue.current);
      if (res.data.isSuccess) setListBills(res.data.foundBills);
    } catch (error) {
      console.log({ error });
      messageAntd(messageTypes.error, "Please try a later");
    }
  };

  return (
    <div
      ref={tableRef}
      id="table-wrapper"
      style={{
        width: "calc (100% - 20px)",
        margin: "20px",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Form.Select
        style={{
          width: "200px",
          position: "absolute",
          right: "20px",
          top: "0px",
        }}
        value={sortValue.current}
        onChange={handleSortByStatus}
      >
        <option value="All">Sort by bill's status</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Done">Done</option>
      </Form.Select>
      {listBills.length > 0 &&
        listBills.map((bill, index) => (
          <div key={bill._id}>
            <h3>
              #{index + 1} ({new Date(bill.createdAt).toLocaleDateString()})
            </h3>

            <Table striped bordered hover className="mt-4 h-50 ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bill.listItems?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.product.prodName}</td>
                    <td>{formatCurrency(item.product.prodPrice)}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.prodDiscount ? (
                        <>
                          <p
                            style={{
                              color: "#999",
                              textDecoration: "line-through",
                            }}
                          >
                            {formatCurrency(
                              item.product.prodPrice * item.quantity
                            )}
                          </p>
                          <p>
                            {formatCurrency(
                              item.product.prodPrice *
                                item.quantity *
                                (1 - item.prodDiscount / 100)
                            )}
                          </p>
                        </>
                      ) : (
                        formatCurrency(item.quantity * item.product.prodPrice)
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>
                    <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>User</p>
                  </td>
                  <td>
                    <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                      {bill.user.userName} ({bill.user.userNameID})
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>
                    <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>Total</p>
                  </td>
                  <td>
                    <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                      {" "}
                      {formatCurrency(
                        bill.price.totalPrice - bill.price.shippingFee
                      )}
                      {bill.discountUsed && ` (-${bill.price.discount}%)`}{" "}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>
                    <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>
                      Status
                    </p>
                  </td>
                  <td>
                    <Form.Select
                      onChange={(e) => handleStatusChange(e, bill._id)}
                      value={bill.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Done">Done</option>
                    </Form.Select>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))}
    </div>
  );
}

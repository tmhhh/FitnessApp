import axios from "axios";
import messageAntd, { messageTypes } from "components/Common/Toast/message";
import { useEffect, useRef, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import checkOutApi from "../../../../api/checkoutApi";
import { address_API_config } from "../../../../assets/constants";
import cartSlice, { getCart } from "../../../../redux/slices/cartSlice";
import { formatCurrency } from "../../../../utils/formatCurrency";
import ShippingForm from "./ShippingForm";
import "./style.scss";

export default function CheckoutModal({
  showModal,
  discountFormRef,
  handleCloseModal,
  listItems,
  usedDiscountRef,
  cartTotalPrice,
  userInfo,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  //PROVINCE STATE
  const [addressData, setAddressData] = useState({
    provincesData: [],
    districtsData: [],
    wardsData: [],
  });
  const { provincesData, districtsData, wardsData } = addressData;
  //TAB STATE
  const [key, setKey] = useState("Order");

  //FORM SUBMIT REF DATA
  const formData = useRef({});
  // const { formData } = useContext(OrderContext);

  //FORMIK  FORM REF
  const formRef = useRef();

  //FETCH PROVINCE API
  useEffect(() => {
    const getProvincesData = async () => {
      try {
        const res = await axios.get(address_API_config.provinces_API_URL, {
          headers: {
            token: address_API_config.token,
          },
        });
        // console.log(res.data);
        setAddressData({ ...addressData, provincesData: res.data.data });
      } catch (error) {
        console.log({ error });
      }
    };
    getProvincesData();
  }, []);

  //TRIGGER FORMIK FORM SUBMIT
  const triggerSubmit = () => {
    formRef.current.handleSubmit();
  };

  //HANDLE ON SUBMIT
  const handleOnSubmit = async (values) => {
    // //COUNT TOTAL WEIGHT
    const itemsTotalWeight = listItems.reduce((sum, current) => {
      return sum + current.product.prodWeight * current.quantity;
    }, 0);
    formData.current = {
      ...values,
      payment: {
        method: values.paymentMethod.value,
      },
      listItems: listItems.filter((e) => e.isSelected && !e.isOrdered),
      discountUsedID:
        usedDiscountRef.current.isUsed === true
          ? usedDiscountRef.current.discountCode
          : null,
      itemsTotalWeight,
    };
    delete formData.current.paymentMethod;
    try {
      const shippingRes = await axios.get(
        address_API_config.shipping_fee_API_URL,
        {
          headers: {
            token: address_API_config.token,
            shop_id: address_API_config.shop_id,
          },
          params: {
            service_type_id: 2,
            insurance_value: cartTotalPrice.toFixed(0) * 230000,
            coupon: null,
            from_district_id: 1442,
            to_district_id: parseInt(formData.current.district),
            to_ward_code: formData.current.ward.toString(),
            height: 15,
            length: 15,
            weight: formData.current.itemsTotalWeight,
            width: 15,
          },
        }
      );
      // console.log(shippingRes.data.data.total);

      formData.current = {
        ...formData.current,
        shippingFee: parseFloat(
          (shippingRes.data.data.total / 230000).toFixed(2)
        ),
      };
      setKey("Confirm");
    } catch (error) {
      console.log({ error });
    }
  };

  const handleCheckoutSuccessfully = () => {
    setKey("Order");
    usedDiscountRef.current = {
      isUsed: false,
      discountPercent: 0,
      discountCode: null,
    };
    dispatch(getCart());
    dispatch(cartSlice.actions.setCartLoading({ cartLoading: false }));
  };
  const formatFormRefData = () => {
    discountFormRef.current.resetForm();
    formRef.current.resetForm();
    handleCloseModal();
    dispatch(cartSlice.actions.setCartLoading({ cartLoading: true }));
  };

  //HANDLE CONFIRM ORDER
  const handleConfirmOrder = async () => {
    try {
      if (formData.current.payment.method === "PAYPAL") {
        const res = await checkOutApi.paypalCheckout({ ...formData.current });
        let timer = null;
        if (res.data.isSuccess) {
          formatFormRefData();
          const newWindow = window.open(
            res.data.approveUrl,
            "_blank",
            "width=500,height=600"
          );

          timer = setInterval(async () => {
            try {
              if (newWindow.closed) {
                clearInterval(timer);
                handleCheckoutSuccessfully();
              }
            } catch (error) {
              console.log({ error });
            }
          }, 500);
        }
      } else if (formData.current.payment.method === "VNPAY") {
        const res = await checkOutApi.vnpayCheckout({ ...formData.current });
        let timer = null;
        if (res.data.isSuccess) {
          formatFormRefData();
          const newWindow = window.open(
            res.data.approveUrl,
            "_blank",
            "width=500,height=600"
          );

          timer = setInterval(async () => {
            if (newWindow.closed) {
              clearInterval(timer);
              handleCheckoutSuccessfully();
            }
          }, 500);
        }
        // const res = await checkOutApi.vnpayCheckout({ ...formData.current });
        // let timer = null;
        // if (res.data.isSuccess) {
        //   const newWindow = window.open(
        //     res.data.approveUrl,
        //     "_blank",
        //     "width=500,height=600"
        //   );
        //   timer = setInterval(async () => {
        //     try {
        //       if (newWindow.closed) {
        //         console.log("User closes the window");
        //         clearInterval(timer);
        //       }
        //       if (
        //         newWindow.location.href.toString() ===
        //         CLIENT_PUBLIC_URL + "/checkout/success"
        //       ) {
        //         clearInterval(timer);
        //         newWindow.close();
        //         const checkOutRes = await checkOutApi.billCheckout({
        //           ...formData.current,
        //         });
        //         if (checkOutRes.data.isSuccess) {
        //           dispatch(
        //             cartSlice.actions.setCart({
        //               cartLoading: false,
        //               userCart: checkOutRes.data.updatedCart,
        //             })
        //           );
        //           history.push("/checkout/success");
        //         }
        //         console.log("vnpay success");
        //       }
        //     } catch (error) {
        //       console.log("CORS");
        //     }
        //   }, 500);
        // }
      } else {
        const checkOutRes = await checkOutApi.billCheckout({
          ...formData.current,
        });
        if (checkOutRes.data.isSuccess) {
          formatFormRefData();
          handleCheckoutSuccessfully();
          // dispatch(
          //   cartSlice.actions.setCart({
          //     cartLoading: false,
          //     userCart: checkOutRes.data.updatedCart,
          //   })
          // );
          history.push("/checkout/success");
        }
      }
    } catch (error) {
      console.log({ error });
      if (error.response?.status === 400)
        messageAntd(messageTypes.error, error.response.data.message + " !!!");
    }
  };

  return (
    <Modal
      className="overflow-auto mt-4  checkout_modal"
      centered
      show={showModal}
      onHide={handleCloseModal}
      size="lg"
    >
      <>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            CHECKOUT SUMMARY
          </Modal.Title>
        </Modal.Header>
        <Tabs id="controlled-tab-example" activeKey={key} className="mb-3">
          <Tab eventKey="Order" title="Order Info 🛒">
            <Modal.Body>
              <ShippingForm
                {...addressData}
                setAddressData={setAddressData}
                addressData={addressData}
                formRef={formRef}
                handleOnSubmit={handleOnSubmit}
              />
            </Modal.Body>
            <Modal.Footer>
              <button
                className="common-button common-button-red"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="submit"
                className="common-button common-button-blue"
                onClick={triggerSubmit}
              >
                Next
              </button>
            </Modal.Footer>
          </Tab>
          <Tab disabled={true} eventKey="Confirm" title="Order Confirm ✅ ">
            <Modal.Body>
              {Object.keys(formData.current).length > 0 && (
                <>
                  <div className="d-flex mb-2">
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#333",
                      }}
                      className="order_user_name_label w-50"
                    >
                      Order Customer
                    </div>
                    <div
                      style={{ fontSize: "15px", fontWeight: "500" }}
                      className="order_user_name_value w-50"
                    >
                      {userInfo.userName}
                    </div>
                  </div>
                  <div className="d-flex mb-2">
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#333",
                      }}
                      className="address_label w-50"
                    >
                      Address
                    </div>
                    <div
                      style={{ fontSize: "15px", fontWeight: "500" }}
                      className="address_value w-50"
                    >
                      {formData.current.apartmentNumber +
                        ", " +
                        wardsData.find(
                          (e) => e.WardCode === formData.current.ward
                        ).WardName +
                        ", " +
                        districtsData.find(
                          (e) =>
                            e.DistrictID === parseInt(formData.current.district)
                        ).DistrictName +
                        ", " +
                        provincesData.find(
                          (e) =>
                            e.ProvinceID === parseInt(formData.current.province)
                        ).ProvinceName}
                    </div>
                  </div>
                  <div className="d-flex mb-2">
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#333",
                      }}
                      className="subtotal_price_label w-50"
                    >
                      Subtotal Price:
                    </div>
                    <div
                      style={{ fontSize: "15px", fontWeight: "500" }}
                      className="subtotal_price_value w-50"
                    >
                      {formatCurrency(cartTotalPrice)}
                    </div>
                  </div>
                  <div className="d-flex mb-2">
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#333",
                      }}
                      className="shipping_price_label w-50"
                    >
                      Shipping Price:
                    </div>
                    <div
                      style={{ fontSize: "15px", fontWeight: "500" }}
                      className="shipping_price_value w-50"
                    >
                      {formatCurrency(parseFloat(formData.current.shippingFee))}
                    </div>
                  </div>
                  <div
                    className="d-flex   mb-2 "
                    style={{
                      borderTop: "1px solid black",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#333",
                      }}
                      className="w-50"
                    >
                      Total Price:
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                      className="total_price_value w-50 	"
                    >
                      {formatCurrency(
                        cartTotalPrice + formData.current.shippingFee
                      )}
                    </div>
                  </div>
                </>
              )}
            </Modal.Body>

            <Modal.Footer>
              <button
                onClick={() => setKey("Order")}
                className="common-button common-button-grey"
              >
                Back
              </button>
              <button onClick={handleConfirmOrder} className="common-button">
                Confirm Order
              </button>
            </Modal.Footer>
          </Tab>
        </Tabs>
      </>
    </Modal>
  );
}

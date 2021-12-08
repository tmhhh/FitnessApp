import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import cartApi from "../../../api/cartApi";
import vouApi from "../../../api/vouApi";
import { PROD_IMAGE_BASE_URL } from "../../../assets/constants";
import { Context } from "../../../Contexts";
import { cartTotalPrice } from "../../../utils/calculate";
import { formatCurrency } from "../../../utils/formatCurrency";
import CheckoutModal from "./CheckoutModal";
import DiscountForm from "./DiscountForm";
import cartSlice from "../../../redux/slices/cartSlice";

import "./style.scss";
export default function CheckoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setToast } = useContext(Context);
  const { userCart } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const [totalPrice, setTotalPrice] = useState(0);
  const usedDiscountRef = useRef({
    isUsed: false,
    discountPercent: 0,
    discountCode: null,
  });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setTotalPrice(
      cartTotalPrice(userCart, usedDiscountRef.current.discountPercent)
    );
  }, [userCart]);

  //HANDLE MODAL
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    const check = userCart.find((e) => e.isSelected);
    if (check) setShowModal(true);
    else
      setToast({
        toastShow: true,
        title: "Product not found !!!",
        content: "Please choose your product !!!",
        icon: "❌",
        bg: "danger",
      });
  };
  //HANDLE DELETE PRODUCT FROM CART
  const handleRemoveProduct = async (id) => {
    try {
      setToast({
        toastShow: true,
        title: "Deleting ...",
        content: "Please wait a second",
        icon: "👀",
        bg: "info",
      });
      if (isAuthenticated) {
        const res = await cartApi.removeFromCart(id);
        if (res.data.isSuccess) {
          // console.log(res.data);
          dispatch(
            cartSlice.actions.deletingFromCart({
              prodID: res.data.deletedProdID,
            })
          );
          return setToast({
            toastShow: true,
            title: "Delete Successfully !!!",
            content: "Happy shopping :)",
            icon: "✔",
            bg: "success",
          });
        }
      } else {
      }
    } catch (err) {
      console.log(err);
      setToast({
        toastShow: true,
        title: "Something happens !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
    }
  };
  //UPDATE ITEM TO SELECTED
  const handleSelectProduct = async (prodID) => {
    try {
      const res = await cartApi.updateProductSelect(prodID);
      if (res.data.isSuccess) {
        dispatch(
          cartSlice.actions.setCart({
            cartLoading: false,
            userCart: res.data.userCart,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  //HANDLE REDIRECT TO DETAIL PAGE
  const handleRedirectProduct = (id) => {
    history.push(`/product/${id}`);
  };

  //HANDLE UPDATE QUANTITY
  const handleUpdateQuantity = async (prodID, quantity) => {
    try {
      // if (action === "decrease" && quantity - 1 <= 0) return;
      setToast({
        toastShow: true,
        title: "Updating ...",
        content: "Please wait a second",
        icon: "👀",
        bg: "info",
      });
      if (isAuthenticated) {
        const res = await cartApi.updateCart(
          prodID,
          // action === "increase" ? quantity + 1 : quantity - 1
          quantity
        );
        if (res.data.isSuccess) {
          // console.log(res.data.userCart);
          dispatch(
            cartSlice.actions.setCart({
              cartLoading: false,
              userCart: res.data.userCart,
            })
          );
          return setToast({
            toastShow: true,
            title: "Update Successfully !!!",
            content: "Happy shopping :)",
            icon: "✔",
            bg: "success",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setToast({
        toastShow: true,
        title: "Something happens !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
    }
  };

  ///SUBMIT VOUCHER
  const handleSubmitVoucher = async ({ vouCode }) => {
    if (usedDiscountRef.current.isUsed)
      return setToast({
        toastShow: true,
        title: "You have already used before !!!",
        content: "Please try again next time !!!",
        icon: "❌",
        bg: "danger",
      });
    setToast({
      toastShow: true,
      title: "Checking ...",
      content: "Please wait a second",
      icon: "👀",
      bg: "info",
    });
    try {
      const res = await vouApi.verifyVoucher(vouCode);

      if (res.data.isSuccess) {
        usedDiscountRef.current = {
          // ...usedDiscountRef.current,
          isUsed: true,
          discountPercent: res.data.voucher.vouDiscount,
          discountCode: res.data.voucher._id,
        };
        // setTotalPrice((totalPrice) => {
        //   const newPrice =
        //     totalPrice * (1 - usedDiscountRef.current.discountPercent / 100);
        //   return newPrice;
        // });
        setTotalPrice(
          cartTotalPrice(userCart, usedDiscountRef.current.discountPercent)
        );
        setToast({
          toastShow: true,
          title: "Your code is valid !!!",
          content: "Happy shopping :)",
          icon: "✔",
          bg: "success",
        });
        // usedDiscountRef.current = true;

        return;
      }
    } catch (error) {
      console.log({ error });
      setToast({
        toastShow: true,
        title: "Code is invalid !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
    }
  };
  return (
    <>
      <div className="main_container">
        <div className="shopping_cart_container">
          <div className="shopping_cart_title">
            Cart (
            {userCart.reduce((sum, e) => {
              if (e.isSelected && !e.isOrdered) return sum + 1;
              return sum;
            }, 0)}{" "}
            items)
          </div>
          <div className="shopping_cart_products">
            {userCart.map(
              (prod) =>
                !prod.isOrdered && (
                  <div key={prod.product._id} className="shopping_cart_product">
                    <div className="product_image">
                      <img
                        src={`${
                          PROD_IMAGE_BASE_URL + prod.product.prodThumbnail
                        }`}
                        alt={prod.product.prodName}
                      />
                    </div>
                    <div className="product_info">
                      <div className="product_info_left">
                        <div className="product_name">
                          {prod.product.prodName}
                        </div>
                        <div className="product_category">
                          {prod.product.prodCategory.cateName.cateName}
                        </div>
                        <div className="product_filter">
                          {prod.product.prodCategory.cateFilter.filterName}
                        </div>
                        <div className="cart_action">
                          <Button
                            className="cart_action_remove mt-4 rounded-0"
                            variant="danger"
                            style={{ marginRight: "5px" }}
                            onClick={() =>
                              handleRemoveProduct(prod.product._id)
                            }
                          >
                            X REMOVE ITEM
                          </Button>
                          <Button
                            className="cart_action_redirect_detail rounded-0 "
                            variant="dark"
                            onClick={() =>
                              handleRedirectProduct(prod.product._id)
                            }
                          >
                            👁‍🗨 VIEW DETAILS
                          </Button>
                        </div>
                      </div>
                      <div className="product_check_box">
                        <input
                          checked={prod.isSelected === true ? true : false}
                          type="checkbox"
                          onChange={() => handleSelectProduct(prod.product._id)}
                        />
                      </div>
                      <div className="product_info_right">
                        <div className="note">Note: 1 piece</div>
                        <div className="product_price">
                          {formatCurrency(
                            prod.product.prodPrice *
                              (1 -
                                (prod.product.prodDiscount?.discountPercent ||
                                  0) /
                                  100)
                          )}
                        </div>
                        <div className="product_quantity">
                          x{" "}
                          <input
                            type="number"
                            min={1}
                            value={prod.quantity}
                            onChange={(e) =>
                              +e.target.value <= prod.product.prodQuantity &&
                              handleUpdateQuantity(
                                prod.product._id,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="product_total_price">
                          {formatCurrency(
                            prod.product.prodPrice *
                              (1 -
                                (prod.product.prodDiscount?.discountPercent ||
                                  0) /
                                  100) *
                              prod.quantity
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="checkout_info_container">
          <div className="discount_container">
            <DiscountForm
              disabled={usedDiscountRef.current.isUsed ? true : false}
              handleSubmitVoucher={handleSubmitVoucher}
            />
          </div>
          <div className="order_summary">
            <div className="order_summary_total_price">
              <p className="order_summary_title">The Total Amount </p>
              <p className="order_summary_price">
                {formatCurrency(totalPrice)}
              </p>
            </div>
            {usedDiscountRef.current.isUsed && (
              <div className="order_summary_discount">
                <p className="order_summary_discount_title">Discount Used</p>
                <p className="order_summary_discount_value">
                  -{usedDiscountRef.current.discountPercent}% (
                  {formatCurrency(
                    (totalPrice /
                      (1 - usedDiscountRef.current.discountPercent / 100)) *
                      (usedDiscountRef.current.discountPercent / 100)
                  )}
                  )
                </p>
              </div>
            )}

            <Button
              onClick={handleShowModal}
              className="w-100  "
              variant="primary"
            >
              CHECK OUT
            </Button>
          </div>
        </div>
      </div>

      <CheckoutModal
        listItems={userCart}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        usedDiscountRef={usedDiscountRef}
        cartTotalPrice={totalPrice}
        userInfo={userInfo}
      />
    </>
  );
}

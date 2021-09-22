import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  const { setToast } = useContext(Context);
  const { userCart } = useSelector((state) => state.cartReducer);
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const [totalPrice, setTotalPrice] = useState(0);
  const usedDiscountRef = useRef(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setTotalPrice(cartTotalPrice(userCart));
  }, [userCart]);

  //HANDLE MODAL
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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

  //HANDLE UPDATE QUANTITY
  const handleUpdateQuantity = async (prodID, quantity, action) => {
    try {
      if (action === "decrease" && quantity - 1 <= 0) return;
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
          action === "increase" ? quantity + 1 : quantity - 1
        );
        if (res.data.isSuccess) {
          console.log(res.data.userCart);
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
    if (usedDiscountRef.current)
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
        usedDiscountRef.current = true;
        setTotalPrice((totalPrice) => {
          const newPrice =
            totalPrice - (totalPrice * res.data.voucher.vouDiscount) / 100;
          return newPrice;
        });
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
      <div className="checkout_main_container">
        <div className="checkout_container">
          <Link to="/shopping">
            <i className="fas fa-long-arrow-alt-left"></i>
          </Link>
          <div className="dynamic_checkout">
            <p className="dynamic_checkout_title">Express Checkout</p>
            <div className="dynamic_checkout_content">
              <div className="dynamic_checkout_paypal">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICAgIDxwYXRoIGZpbGw9IiMwMDljZGUiIGQ9Ik0gMjAuOTA1IDkuNSBDIDIxLjE4NSA3LjQgMjAuOTA1IDYgMTkuNzgyIDQuNyBDIDE4LjU2NCAzLjMgMTYuNDExIDIuNiAxMy42OTcgMi42IEwgNS43MzkgMi42IEMgNS4yNzEgMi42IDQuNzEgMy4xIDQuNjE1IDMuNiBMIDEuMzM5IDI1LjggQyAxLjMzOSAyNi4yIDEuNjIgMjYuNyAyLjA4OCAyNi43IEwgNi45NTYgMjYuNyBMIDYuNjc1IDI4LjkgQyA2LjU4MSAyOS4zIDYuODYyIDI5LjYgNy4yMzYgMjkuNiBMIDExLjM1NiAyOS42IEMgMTEuODI1IDI5LjYgMTIuMjkyIDI5LjMgMTIuMzg2IDI4LjggTCAxMi4zODYgMjguNSBMIDEzLjIyOCAyMy4zIEwgMTMuMjI4IDIzLjEgQyAxMy4zMjIgMjIuNiAxMy43OSAyMi4yIDE0LjI1OCAyMi4yIEwgMTQuODIxIDIyLjIgQyAxOC44NDUgMjIuMiAyMS45MzUgMjAuNSAyMi44NzEgMTUuNSBDIDIzLjMzOSAxMy40IDIzLjE1MyAxMS43IDIyLjAyOSAxMC41IEMgMjEuNzQ4IDEwLjEgMjEuMjc5IDkuOCAyMC45MDUgOS41IEwgMjAuOTA1IDkuNSI+PC9wYXRoPgogICAgPHBhdGggZmlsbD0iIzAxMjE2OSIgZD0iTSAyMC45MDUgOS41IEMgMjEuMTg1IDcuNCAyMC45MDUgNiAxOS43ODIgNC43IEMgMTguNTY0IDMuMyAxNi40MTEgMi42IDEzLjY5NyAyLjYgTCA1LjczOSAyLjYgQyA1LjI3MSAyLjYgNC43MSAzLjEgNC42MTUgMy42IEwgMS4zMzkgMjUuOCBDIDEuMzM5IDI2LjIgMS42MiAyNi43IDIuMDg4IDI2LjcgTCA2Ljk1NiAyNi43IEwgOC4yNjcgMTguNCBMIDguMTczIDE4LjcgQyA4LjI2NyAxOC4xIDguNzM1IDE3LjcgOS4yOTYgMTcuNyBMIDExLjYzNiAxNy43IEMgMTYuMjI0IDE3LjcgMTkuNzgyIDE1LjcgMjAuOTA1IDEwLjEgQyAyMC44MTIgOS44IDIwLjkwNSA5LjcgMjAuOTA1IDkuNSI+PC9wYXRoPgogICAgPHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSA5LjQ4NSA5LjUgQyA5LjU3NyA5LjIgOS43NjUgOC45IDEwLjA0NiA4LjcgQyAxMC4yMzIgOC43IDEwLjMyNiA4LjYgMTAuNTEzIDguNiBMIDE2LjY5MiA4LjYgQyAxNy40NDIgOC42IDE4LjE4OSA4LjcgMTguNzUzIDguOCBDIDE4LjkzOSA4LjggMTkuMTI3IDguOCAxOS4zMTQgOC45IEMgMTkuNTAxIDkgMTkuNjg4IDkgMTkuNzgyIDkuMSBDIDE5Ljg3NSA5LjEgMTkuOTY4IDkuMSAyMC4wNjMgOS4xIEMgMjAuMzQzIDkuMiAyMC42MjQgOS40IDIwLjkwNSA5LjUgQyAyMS4xODUgNy40IDIwLjkwNSA2IDE5Ljc4MiA0LjYgQyAxOC42NTggMy4yIDE2LjUwNiAyLjYgMTMuNzkgMi42IEwgNS43MzkgMi42IEMgNS4yNzEgMi42IDQuNzEgMyA0LjYxNSAzLjYgTCAxLjMzOSAyNS44IEMgMS4zMzkgMjYuMiAxLjYyIDI2LjcgMi4wODggMjYuNyBMIDYuOTU2IDI2LjcgTCA4LjI2NyAxOC40IEwgOS40ODUgOS41IFoiPjwvcGF0aD4KPC9zdmc+Cg"
                  alt="paypal-icon"
                />
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTAwIDMyIiB4bWxucz0iaHR0cDomI3gyRjsmI3gyRjt3d3cudzMub3JnJiN4MkY7MjAwMCYjeDJGO3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCI+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAxMiA0LjkxNyBMIDQuMiA0LjkxNyBDIDMuNyA0LjkxNyAzLjIgNS4zMTcgMy4xIDUuODE3IEwgMCAyNS44MTcgQyAtMC4xIDI2LjIxNyAwLjIgMjYuNTE3IDAuNiAyNi41MTcgTCA0LjMgMjYuNTE3IEMgNC44IDI2LjUxNyA1LjMgMjYuMTE3IDUuNCAyNS42MTcgTCA2LjIgMjAuMjE3IEMgNi4zIDE5LjcxNyA2LjcgMTkuMzE3IDcuMyAxOS4zMTcgTCA5LjggMTkuMzE3IEMgMTQuOSAxOS4zMTcgMTcuOSAxNi44MTcgMTguNyAxMS45MTcgQyAxOSA5LjgxNyAxOC43IDguMTE3IDE3LjcgNi45MTcgQyAxNi42IDUuNjE3IDE0LjYgNC45MTcgMTIgNC45MTcgWiBNIDEyLjkgMTIuMjE3IEMgMTIuNSAxNS4wMTcgMTAuMyAxNS4wMTcgOC4zIDE1LjAxNyBMIDcuMSAxNS4wMTcgTCA3LjkgOS44MTcgQyA3LjkgOS41MTcgOC4yIDkuMzE3IDguNSA5LjMxNyBMIDkgOS4zMTcgQyAxMC40IDkuMzE3IDExLjcgOS4zMTcgMTIuNCAxMC4xMTcgQyAxMi45IDEwLjUxNyAxMy4xIDExLjIxNyAxMi45IDEyLjIxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAzNS4yIDEyLjExNyBMIDMxLjUgMTIuMTE3IEMgMzEuMiAxMi4xMTcgMzAuOSAxMi4zMTcgMzAuOSAxMi42MTcgTCAzMC43IDEzLjYxNyBMIDMwLjQgMTMuMjE3IEMgMjkuNiAxMi4wMTcgMjcuOCAxMS42MTcgMjYgMTEuNjE3IEMgMjEuOSAxMS42MTcgMTguNCAxNC43MTcgMTcuNyAxOS4xMTcgQyAxNy4zIDIxLjMxNyAxNy44IDIzLjQxNyAxOS4xIDI0LjgxNyBDIDIwLjIgMjYuMTE3IDIxLjkgMjYuNzE3IDIzLjggMjYuNzE3IEMgMjcuMSAyNi43MTcgMjkgMjQuNjE3IDI5IDI0LjYxNyBMIDI4LjggMjUuNjE3IEMgMjguNyAyNi4wMTcgMjkgMjYuNDE3IDI5LjQgMjYuNDE3IEwgMzIuOCAyNi40MTcgQyAzMy4zIDI2LjQxNyAzMy44IDI2LjAxNyAzMy45IDI1LjUxNyBMIDM1LjkgMTIuNzE3IEMgMzYgMTIuNTE3IDM1LjYgMTIuMTE3IDM1LjIgMTIuMTE3IFogTSAzMC4xIDE5LjMxNyBDIDI5LjcgMjEuNDE3IDI4LjEgMjIuOTE3IDI1LjkgMjIuOTE3IEMgMjQuOCAyMi45MTcgMjQgMjIuNjE3IDIzLjQgMjEuOTE3IEMgMjIuOCAyMS4yMTcgMjIuNiAyMC4zMTcgMjIuOCAxOS4zMTcgQyAyMy4xIDE3LjIxNyAyNC45IDE1LjcxNyAyNyAxNS43MTcgQyAyOC4xIDE1LjcxNyAyOC45IDE2LjExNyAyOS41IDE2LjcxNyBDIDMwIDE3LjQxNyAzMC4yIDE4LjMxNyAzMC4xIDE5LjMxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSA1NS4xIDEyLjExNyBMIDUxLjQgMTIuMTE3IEMgNTEgMTIuMTE3IDUwLjcgMTIuMzE3IDUwLjUgMTIuNjE3IEwgNDUuMyAyMC4yMTcgTCA0My4xIDEyLjkxNyBDIDQzIDEyLjQxNyA0Mi41IDEyLjExNyA0Mi4xIDEyLjExNyBMIDM4LjQgMTIuMTE3IEMgMzggMTIuMTE3IDM3LjYgMTIuNTE3IDM3LjggMTMuMDE3IEwgNDEuOSAyNS4xMTcgTCAzOCAzMC41MTcgQyAzNy43IDMwLjkxNyAzOCAzMS41MTcgMzguNSAzMS41MTcgTCA0Mi4yIDMxLjUxNyBDIDQyLjYgMzEuNTE3IDQyLjkgMzEuMzE3IDQzLjEgMzEuMDE3IEwgNTUuNiAxMy4wMTcgQyA1NS45IDEyLjcxNyA1NS42IDEyLjExNyA1NS4xIDEyLjExNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny41IDQuOTE3IEwgNTkuNyA0LjkxNyBDIDU5LjIgNC45MTcgNTguNyA1LjMxNyA1OC42IDUuODE3IEwgNTUuNSAyNS43MTcgQyA1NS40IDI2LjExNyA1NS43IDI2LjQxNyA1Ni4xIDI2LjQxNyBMIDYwLjEgMjYuNDE3IEMgNjAuNSAyNi40MTcgNjAuOCAyNi4xMTcgNjAuOCAyNS44MTcgTCA2MS43IDIwLjExNyBDIDYxLjggMTkuNjE3IDYyLjIgMTkuMjE3IDYyLjggMTkuMjE3IEwgNjUuMyAxOS4yMTcgQyA3MC40IDE5LjIxNyA3My40IDE2LjcxNyA3NC4yIDExLjgxNyBDIDc0LjUgOS43MTcgNzQuMiA4LjAxNyA3My4yIDYuODE3IEMgNzIgNS42MTcgNzAuMSA0LjkxNyA2Ny41IDQuOTE3IFogTSA2OC40IDEyLjIxNyBDIDY4IDE1LjAxNyA2NS44IDE1LjAxNyA2My44IDE1LjAxNyBMIDYyLjYgMTUuMDE3IEwgNjMuNCA5LjgxNyBDIDYzLjQgOS41MTcgNjMuNyA5LjMxNyA2NCA5LjMxNyBMIDY0LjUgOS4zMTcgQyA2NS45IDkuMzE3IDY3LjIgOS4zMTcgNjcuOSAxMC4xMTcgQyA2OC40IDEwLjUxNyA2OC41IDExLjIxNyA2OC40IDEyLjIxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC43IDEyLjExNyBMIDg3IDEyLjExNyBDIDg2LjcgMTIuMTE3IDg2LjQgMTIuMzE3IDg2LjQgMTIuNjE3IEwgODYuMiAxMy42MTcgTCA4NS45IDEzLjIxNyBDIDg1LjEgMTIuMDE3IDgzLjMgMTEuNjE3IDgxLjUgMTEuNjE3IEMgNzcuNCAxMS42MTcgNzMuOSAxNC43MTcgNzMuMiAxOS4xMTcgQyA3Mi44IDIxLjMxNyA3My4zIDIzLjQxNyA3NC42IDI0LjgxNyBDIDc1LjcgMjYuMTE3IDc3LjQgMjYuNzE3IDc5LjMgMjYuNzE3IEMgODIuNiAyNi43MTcgODQuNSAyNC42MTcgODQuNSAyNC42MTcgTCA4NC4zIDI1LjYxNyBDIDg0LjIgMjYuMDE3IDg0LjUgMjYuNDE3IDg0LjkgMjYuNDE3IEwgODguMyAyNi40MTcgQyA4OC44IDI2LjQxNyA4OS4zIDI2LjAxNyA4OS40IDI1LjUxNyBMIDkxLjQgMTIuNzE3IEMgOTEuNCAxMi41MTcgOTEuMSAxMi4xMTcgOTAuNyAxMi4xMTcgWiBNIDg1LjUgMTkuMzE3IEMgODUuMSAyMS40MTcgODMuNSAyMi45MTcgODEuMyAyMi45MTcgQyA4MC4yIDIyLjkxNyA3OS40IDIyLjYxNyA3OC44IDIxLjkxNyBDIDc4LjIgMjEuMjE3IDc4IDIwLjMxNyA3OC4yIDE5LjMxNyBDIDc4LjUgMTcuMjE3IDgwLjMgMTUuNzE3IDgyLjQgMTUuNzE3IEMgODMuNSAxNS43MTcgODQuMyAxNi4xMTcgODQuOSAxNi43MTcgQyA4NS41IDE3LjQxNyA4NS43IDE4LjMxNyA4NS41IDE5LjMxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5NS4xIDUuNDE3IEwgOTEuOSAyNS43MTcgQyA5MS44IDI2LjExNyA5Mi4xIDI2LjQxNyA5Mi41IDI2LjQxNyBMIDk1LjcgMjYuNDE3IEMgOTYuMiAyNi40MTcgOTYuNyAyNi4wMTcgOTYuOCAyNS41MTcgTCAxMDAgNS42MTcgQyAxMDAuMSA1LjIxNyA5OS44IDQuOTE3IDk5LjQgNC45MTcgTCA5NS44IDQuOTE3IEMgOTUuNCA0LjkxNyA5NS4yIDUuMTE3IDk1LjEgNS40MTcgWiI+PC9wYXRoPjwvc3ZnPg"
                  alt="paypal"
                />
              </div>
            </div>
          </div>
          <div className="alternative_payment_separator">
            <p className="alternative_payment_separator_content">OR</p>
          </div>
          <form className="traditional_checkout">
            <p className="contact_label">Contact Information</p>
            <p className="login_label">
              Already have an account ? <Link to="/login">Log in</Link>
            </p>
            <input type="text" placeholder="Email" />
            <input type="checkbox" />
            <span>Keep me up to date on news and offers</span>
            <div className="shipping_label">Shipping Address</div>
            <input type="text" placeholder="FirstName" id="txtFirstname" />
            <input type="text" placeholder="LastName" id="txtLastname" />
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Phone" />
            <Button onClick={handleShowModal} variant="primary">
              Confirm
            </Button>
          </form>
        </div>
        <div className="shopping_cart_container">
          <div className="added_products">
            {
              // isAuthenticated?
              // userCart.length > 0 &&
              userCart.map((e) => (
                <div key={e.product._id} className="added_product">
                  <div className="added_product_image">
                    <img
                      src={`${PROD_IMAGE_BASE_URL}${e.product.prodThumbnail}`}
                      alt="name"
                    />
                    {/* <div className="added_product_info_quantity">
                      {e.quantity}
                    </div> */}
                  </div>
                  <div className="added_product_info">
                    <div className="added_product_info_name">
                      {e.product.prodName}
                    </div>
                    <div className="added_product_info_category">
                      {e.product.prodCategory.cateName.cateName} |
                      {` ${e.product.prodCategory.cateFilter.filterName}`}
                    </div>
                    <div className="added_product_info_quantity">
                      x {e.quantity}
                    </div>
                  </div>
                  <div className="added_product_price">
                    {formatCurrency(e.product.prodPrice)}
                  </div>
                  <div className="added_product_action_icons">
                    <i
                      onClick={() =>
                        handleUpdateQuantity(
                          e.product._id,
                          e.quantity,
                          "increase"
                        )
                      }
                      className="fas fa-angle-up"
                    ></i>
                    <i
                      onClick={() =>
                        handleUpdateQuantity(
                          e.product._id,
                          e.quantity,
                          "decrease"
                        )
                      }
                      className="fas fa-angle-down"
                    ></i>
                    <i
                      className="addedd_product_icon_close"
                      onClick={() => handleRemoveProduct(e.product._id)}
                    >
                      ❌
                    </i>
                  </div>
                </div>
              ))

              // : userCart.length > 0
              // ? userCart.map((prod) => (
              //     <div key={prod._id} className="added_product">
              //       <div className="added_product_image">
              //         <img
              //           src={`${PROD_IMAGE_BASE_URL}${prod.prodThumbnail}`}
              //           alt="name"
              //         />
              //       </div>
              //       <div className="added_product_name">{prod.prodName}</div>
              //       <div className="added_product_price">
              //         {formatCurrency(prod.prodPrice)}
              //       </div>
              //     </div>
              //   ))
              // : null
              // <Spinner
              //   style={{
              //     position: "absolute",
              //     top: "50%",
              //     left: "50%",
              //     // transform: "translate(-50%,-50%)",
              //   }}
              //   animation="border"
              //   variant="info"
              // />
            }
          </div>
          <div className="discount_container">
            <DiscountForm
              disabled={usedDiscountRef.current ? true : false}
              handleSubmitVoucher={handleSubmitVoucher}
            />
          </div>
          <div className="order_summary">
            <p className="order_summary_total">Total</p>
            <p className="order_summary_price">{formatCurrency(totalPrice)}</p>
          </div>
        </div>
      </div>
      <CheckoutModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

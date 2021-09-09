import React, { useContext } from "react";
import "./style.scss";
import { useHistory } from "react-router";
import cartApi from "../../api/cartApi";
import cartSlice from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import { Context } from "../../Contexts";
export default function Product(props) {
  const { setToast } = useContext(Context);
  const dispatch = useDispatch();
  const history = useHistory();

  //

  const { isAuthenticated, userInfo } = useSelector(
    (state) => state.authReducer
  );
  const { prodName, prodType, prodPrice, prodThumbnail, _id } = props;

  //CHECK IF PRODUCT EXIST IN CART
  const checkExist = (cart, prodID) => {
    return cart.find((e) => e._id === prodID);
  };

  // ADD TO CART
  const handleAddToCart = async () => {
    try {
      setToast({
        toastShow: true,
        title: "Adding ...",
        content: "Please wait a second",
        icon: "👀",
        bg: "info",
      });
      if (isAuthenticated) {
        const res = await cartApi.addToCart(_id);
        setToast({
          toastShow: true,
          title: "Adding successfully !!!",
          content: "You can check it in your personal cart !!!",
          icon: "✔",
          bg: "success",
        });
        dispatch(
          cartSlice.actions.setCart({
            cartLoading: false,
            userCart: res.data.updatedCart,
          })
        );
      } else {
        const addedProduct = {
          _id,
          prodName,
          prodPrice,
          prodThumbnail,
          prodType,
          quantity: 1,
        };
        let newCart = [];
        let userCart = localStorage.getItem("USER_CART");
        if (!userCart) {
          newCart.push(addedProduct);
          localStorage.setItem("USER_CART", JSON.stringify(newCart));
        } else {
          userCart = JSON.parse(userCart);
          const updatedProduct = checkExist(userCart, _id);
          if (updatedProduct) {
            updatedProduct.quantity += 1;
            newCart = [...userCart];
          } else newCart = [...userCart, addedProduct];
          localStorage.setItem("USER_CART", JSON.stringify(newCart));
        }
      }
    } catch (error) {
      console.log(error);
      setToast({
        toastShow: true,
        title: "Failed to add to cart !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
    }
  };
  return (
    <div className="product_card">
      <img
        className="product_card_image"
        src={prodThumbnail}
        alt={prodName}
        onClick={() => {
          history.push("/productDetail");
        }}
      />
      <div className="product_card_content">
        <p className="product_card_name">{prodName}</p>
        <p className="product_card_type">{prodType}</p>
        <p className="product_card_price">{formatCurrency(prodPrice)}</p>
      </div>
      <div className="product_card_actions">
        <i onClick={handleAddToCart}>🛒</i>
        <i>🤍</i>
        {/* <i class="fas fa-heart"></i> */}
      </div>
    </div>
  );
}

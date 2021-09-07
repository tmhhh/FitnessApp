import React from "react";
import "./style.scss";
import { useHistory } from "react-router";
import cartApi from "../../api/cartApi";
import cartSlice from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

export default function Product(props) {
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
      if (isAuthenticated) {
        const res = await cartApi.addToCart(_id);
        console.log(res.data.u);
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
        <i onClick={handleAddToCart} className="fas fa-cart-plus"></i>
        {/* <i class="far fa-heart"></i> */}
      </div>
    </div>
  );
}

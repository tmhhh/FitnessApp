import React from "react";
import "./style.scss";
import { useHistory } from "react-router";
import cartApi from "../../api/cartApi";
import cartSlice from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Product(props) {
  const dispatch = useDispatch();

  const { prodName, prodType, prodPrice, prodImage } = props;
  const history = useHistory();
  // const checkProductExist = (id, cart) => {
  //   return cart.findIndex(
  //     (product) => product._id.toString() === id.toString()
  //   );
  // };
  const handleAddToCart = async () => {
    try {
      const { _id } = props;
      const res = await cartApi.addToCart(_id);
      if (res.data.isSuccess)
        dispatch(
          cartSlice.actions.setCart({
            cartLoading: false,
            userCart: res.data.userCart,
          })
        );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="product_card">
      <img
        className="product_card_image"
        src={prodImage}
        alt={prodName}
        onClick={() => {
          history.push("/productDetail");
        }}
      />
      <div className="product_card_content">
        <p className="product_card_name">{prodName}</p>
        <p className="product_card_type">{prodType}</p>
        <p className="product_card_price">{prodPrice}</p>
      </div>
      <div className="product_card_actions">
        <i onClick={handleAddToCart} className="fas fa-cart-plus"></i>
        {/* <i class="far fa-heart"></i> */}
      </div>
    </div>
  );
}

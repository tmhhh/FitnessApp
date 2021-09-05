import React from "react";
import "./style.scss";
import { useHistory } from "react-router";

export default function Product(props) {
  const { prodName, prodType, prodPrice, prodImage } = props;
  const history = useHistory();
  const checkProductExist = (id, cart) => {
    return cart.findIndex(
      (product) => product._id.toString() === id.toString()
    );
  };
  const handleAddToCart = async () => {
    let addedProduct = props;
    let newCart = [];
    let userOldCart = localStorage.getItem("USER_CART");
    if (userOldCart) {
      userOldCart = JSON.parse(userOldCart);
      const index = checkProductExist(addedProduct._id, userOldCart);
      console.log(index);
      if (index >= 0) {
        userOldCart[index].quan += 1;
        newCart = userOldCart;
      } else newCart = [addedProduct, ...userOldCart];
    } else newCart.push(addedProduct);
    localStorage.setItem("USER_CART", JSON.stringify(newCart));
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

import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { PROD_IMAGE_BASE_URL } from "../../assets/constants";
import { Context } from "../../Contexts";
import { formatCurrency } from "../../utils/formatCurrency";
import "./style.scss";

export default function Product(props) {
  const { addToCart } = useContext(Context);
  const dispatch = useDispatch();
  const history = useHistory();

  //

  const { prodName, prodType, prodPrice, prodThumbnail, _id } = props;

  // ADD TO CART
  const handleAddToCart = () => {
    console.log(props);
    addToCart(props);
  };
  return (
    <div className="product_card">
      <img
        className="product_card_image"
        src={`${PROD_IMAGE_BASE_URL}${prodThumbnail}`}
        alt={prodName}
        onClick={() => {
          history.push(`/product/${props._id}`);
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

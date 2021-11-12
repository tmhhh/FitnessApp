import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PROD_IMAGE_BASE_URL } from "../../assets/constants";
import { Context } from "../../Contexts";
import { formatCurrency } from "../../utils/formatCurrency";
import "./style.scss";

export default function Product(props) {
  const { addToCart, handleAddFavorite, handleRemoveFavorite } =
    useContext(Context);

  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  //

  const { prodName, prodType, prodPrice, prodThumbnail, _id, prodWeight } =
    props;

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
          history.push(`/product/${_id}`);
        }}
      />
      <div className="product_card_content">
        <p className="product_card_name">{prodName}</p>
        <p className="product_card_type">{prodType}</p>
        <p className="product_card_price">{formatCurrency(prodPrice)}</p>
        {/* <p className="product_card_weight">{prodWeight}g</p> */}
      </div>
      <div className="product_card_actions">
        <div onClick={handleAddToCart} className="product_card_action">
          <i className="fas fa-shopping-cart"></i>
          <span>+ Cart</span>
        </div>
        {!userInfo.favoriteProducts?.find(
          // THE SAME AS userInfo.favoriteProducts && ...
          (e) => e.toString() === _id.toString()
        ) ? (
          <div
            onClick={() => handleAddFavorite(_id)}
            className="product_card_action"
          >
            <i className="fab fa-gratipay"></i>
            <span>+ Favorite</span>
          </div>
        ) : (
          <div
            onClick={() => handleRemoveFavorite(_id)}
            className="product_card_action"
          >
            <i className="fas fa-heart-broken"></i>
            <span>- Favorite</span>
          </div>
        )}
      </div>
    </div>
  );
}

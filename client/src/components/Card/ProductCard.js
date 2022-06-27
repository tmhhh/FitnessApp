import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PROD_IMAGE_BASE_URL } from "../../assets/constants";
import { Context } from "../../contexts";
import { formatCurrency } from "../../utils/formatCurrency";
import "./style.scss";

export default function Product(props) {
  const { addToCart, handleAddFavorite, handleRemoveFavorite } =
    useContext(Context);

  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  //

  const {
    prodName,
    prodType,
    prodPrice,
    prodThumbnail,
    _id,
    prodWeight,
    prodDiscount,
    status,
  } = props;

  // ADD TO CART
  const handleAddToCart = () => {
    console.log(props);
    addToCart(props);
  };
  return status === "out_of_stock" ? (
    <div
      className={`product_card ${status === "out_of_stock" && "out_of_stock"}`}
    >
      {status === "out_of_stock" && (
        <div className="out_of_stock_banner">Out Of Stock !!!</div>
      )}

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
      </div>
    </div>
  ) : (
    <div className={`product_card`}>
      {status === "out_of_stock" && (
        <div className="out_of_stock_banner">Out Of Stock !!!</div>
      )}
      {prodDiscount?.isDiscounted && (
        <div className="product_card_banner">
          -{prodDiscount?.discountPercent}%
        </div>
      )}
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
        {prodDiscount?.isDiscounted &&
        new Date(prodDiscount?.startDate).getTime() - new Date().getTime() <
          0 ? (
          <>
            <p className="product_card_price line-through ">
              {formatCurrency(prodPrice)}
            </p>
            <p className="product_card_discount_price">
              {formatCurrency(
                prodPrice * (1 - parseFloat(prodDiscount.discountPercent) / 100)
              )}
            </p>
          </>
        ) : (
          <p className="product_card_price  ">{formatCurrency(prodPrice)}</p>
        )}

        {/* <p className="product_card_weight">{prodWeight}g</p> */}
      </div>
      <div className="product_card_actions">
        <div onClick={handleAddToCart} className="product_card_action">
          <i className="fas fa-shopping-cart"></i>
          <span>+ Cart</span>
        </div>
        {!userInfo.favoriteProducts?.find(
          // THE SAME AS userInfo.favoriteProducts && ...
          (e) => e._id.toString() === _id.toString()
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

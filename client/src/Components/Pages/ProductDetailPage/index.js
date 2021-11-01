import React, { useState, useContext, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";

import "./style.scss";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PROD_IMAGE_BASE_URL } from "../../../assets/constants";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Context } from "../../../Contexts";
import { getReview } from "../../../redux/slices/reviewSlice";
import ReviewSection from "../../Review/ReviewSection";
function ProductDetailPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const listReview = useSelector((state) => state.reviewReducer.listReview);
  const { addToCart } = useContext(Context);

  const [quantity, setQuantity] = useState(1);
  const { id: prodID } = useParams();
  let { listProducts, prodLoading } = useSelector((state) => state.prodReducer);
  const chosenProd = listProducts.find((prod) => prod._id === prodID);

  //
  useEffect(() => {
    (async () => {
      await dispatch(getReview(prodID));
    })();
  }, [prodID, dispatch]);

  //HANDLE ADD TO CART
  const handleAddToCart = () => {
    addToCart(chosenProd, quantity);
  };

  //GET 3 RELATED PRODUCTS
  const relatedProds = listProducts.reduce((acc, prod) => {
    if (
      prod._id !== prodID &&
      prod.prodCategory.cateFilter.filterName ===
        chosenProd.prodCategory.cateFilter.filterName &&
      acc.length < 3
    ) {
      return [...acc, prod];
    }
    return acc;
  }, []);
  console.log({ relatedProds });
  return (
    <>
      <div className="product_info_container">
        {prodLoading ? (
          <Spinner
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              // transform: "translate(-50%,-50%)",
            }}
            animation="border"
            variant="info"
          />
        ) : (
          <>
            <div className="product_info">
              <div className="product_info_image">
                <img
                  src={`${PROD_IMAGE_BASE_URL}${chosenProd.prodThumbnail}`}
                  alt={chosenProd.prodName}
                />
              </div>
              <div className="product_info_details">
                <div className="product_info_type">{chosenProd.prodType}</div>
                <div className="product_info_review">
                  <i
                    style={{ color: "yellow", marginRight: "5px" }}
                    className="fa fa-star"
                    aria-hidden="true"
                  ></i>
                  4.5 (23 Reviews)
                </div>
                <div className="product_info_name">
                  {chosenProd.prodName} <i className="far fa-heart"></i>
                </div>
                <div className="product_info_price">
                  {formatCurrency(chosenProd.prodPrice)}
                </div>
                <div className="product_info_cate">
                  {chosenProd.prodCategory.cateName.cateName} |{" "}
                  {chosenProd.prodCategory.cateFilter.filterName}{" "}
                </div>
                <div className="product_info_weight">
                  {chosenProd.prodWeight}g
                </div>
                <div className="product_info_des">
                  {chosenProd.prodDescription}
                </div>
                <div className="product_info_action">
                  <Button onClick={handleAddToCart} variant="dark">
                    Add to cart
                  </Button>
                  <Button variant="dark">
                    <i
                      onClick={() => setQuantity(quantity + 1)}
                      className="fas fa-plus"
                    ></i>
                    <span className="product_info_quantity">{quantity}</span>
                    <i
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="fas fa-minus"
                    ></i>{" "}
                  </Button>
                </div>
              </div>
            </div>
            <div className="product_related">
              <p className="product_related_title">Similar Products</p>
              {relatedProds.map((prod) => (
                <div
                  onClick={() => history.push(`/product/${prod._id}`)}
                  key={prod._id}
                  className="product_related_info"
                >
                  <div className="product_related_info_image">
                    <img
                      src={`${PROD_IMAGE_BASE_URL}${prod.prodThumbnail}`}
                      alt={prod.prodName}
                    />
                  </div>
                  <div className="product_related_info_details">
                    <div className="product_related_info_name">
                      {prod.prodName}
                      <i className="far fa-heart"></i>
                    </div>
                    <div className="product_related_info_price">
                      {formatCurrency(prod.prodPrice)}
                    </div>
                    <div className="product_related_info_cate">
                      {prod.prodCategory.cateName.cateName} |{" "}
                      {prod.prodCategory.cateFilter.filterName}
                    </div>
                    <div className="product_related_info_weight">
                      {prod.prodWeight}g
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* //REVIEW */}
      {/* <ReviewSection listReview={listReview} /> */}
    </>
  );
}

export default ProductDetailPage;

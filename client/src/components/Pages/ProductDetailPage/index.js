import React, { useState, useContext, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import "./style.scss";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PROD_IMAGE_BASE_URL } from "../../../assets/constants";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Context } from "../../../contexts";
import { getReview } from "../../../redux/slices/reviewSlice";
import ReviewSection from "../../Review/ReviewSection";
import { Helmet } from "react-helmet";
function ProductDetailPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const listReview = useSelector((state) => state.reviewReducer.listReview);
  const { addToCart } = useContext(Context);

  const [quantity, setQuantity] = useState(1);
  const { id: prodID } = useParams();
  let { listProducts, prodLoading } = useSelector((state) => state.prodReducer);
  const chosenProd = listProducts.find((prod) => prod._id === prodID);
  const [countingClock, setCountingClock] = useState(null);
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

  //
  useEffect(() => {
    let current = new Date().getTime();

    let difference =
      new Date(chosenProd?.prodDiscount?.startDate).getTime() - current;
    if (!prodLoading && difference > 0) {
      let timer = setInterval(() => {
        current = new Date().getTime();
        difference =
          new Date(chosenProd.prodDiscount?.startDate).getTime() - current;

        let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= daysDifference * 1000 * 60 * 60 * 24;

        let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60;

        let minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60;

        let secondsDifference = Math.floor(difference / 1000);
        // console.log({
        //   daysDifference,
        //   hoursDifference,
        //   minutesDifference,
        //   secondsDifference,
        // });
        setCountingClock({
          daysDifference,
          hoursDifference,
          minutesDifference,
          secondsDifference,
        });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [prodLoading]);
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
  // console.log({ relatedProds });
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
            {countingClock && (
              <>
                <div className="counting-items">
                  <h3 className="counting-title">Sale in</h3>
                  <div className="counting-item">
                    <p className="counting-item-value">
                      {countingClock.daysDifference}
                    </p>
                    <p className="counting-item-label">days</p>
                  </div>
                  <div className="counting-item">
                    <p className="counting-item-value">
                      {countingClock.hoursDifference}
                    </p>
                    <p className="counting-item-label">hours</p>
                  </div>
                  <div className="counting-item">
                    <p className="counting-item-value">
                      {countingClock.minutesDifference}
                    </p>
                    <p className="counting-item-label">mins</p>
                  </div>
                  <div className="counting-item">
                    <p className="counting-item-value">
                      {countingClock.secondsDifference}
                    </p>
                    <p className="counting-item-label">secs</p>
                  </div>
                </div>
              </>
            )}
            <Helmet>
              <title>{chosenProd.prodName}</title>
              <meta name="description" content={chosenProd.prodName} />
            </Helmet>
            <div className="product_info">
              <div className="product_info_image">
                <img
                  src={`${PROD_IMAGE_BASE_URL}${chosenProd.prodThumbnail}`}
                  alt={chosenProd.prodName}
                />
              </div>
              <div className="product_info_details">
                <div className="product_info_type">{chosenProd.prodType}</div>
                {/* <div className="product_info_review">
                  <i
                    style={{ color: "yellow", marginRight: "5px" }}
                    className="fa fa-star"
                    aria-hidden="true"
                  ></i>
                  4.5 (23 Reviews) */}
                {/* </div> */}

                <div className="product_info_name ">
                  {chosenProd.prodName} <i className="far fa-heart"></i>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "1.7rem",
                      fontWeight: 600,
                    }}
                  >
                    (
                    {chosenProd.prodQuantity !== 0
                      ? chosenProd.prodQuantity + " left"
                      : "Out of stock"}
                    )
                  </span>
                </div>
                {chosenProd.prodDiscount?.isDiscounted &&
                new Date(chosenProd.prodDiscount?.startDate).getTime() -
                  new Date().getTime() <
                  0 ? (
                  <>
                    <div className="line-through">
                      {formatCurrency(chosenProd.prodPrice)}
                    </div>
                    <div className="product_info_price d-flex align-items-center">
                      {formatCurrency(
                        chosenProd.prodPrice *
                          (1 -
                            (chosenProd.prodDiscount?.discountPercent / 100 ||
                              0))
                      )}
                      <span className=" product_info_weight">
                        / {chosenProd.prodWeight}g
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="product_info_price d-flex align-items-center">
                    {formatCurrency(chosenProd.prodPrice)}{" "}
                    <span className=" product_info_weight">
                      / {chosenProd.prodWeight}g
                    </span>
                  </div>
                )}

                <div className="product_info_cate">
                  {chosenProd.prodCategory.cateName.cateName} |{" "}
                  {chosenProd.prodCategory.cateFilter.filterName}{" "}
                </div>
                {/* <div className="product_info_weight">
                  {chosenProd.prodWeight}g
                </div> */}
                <div className="product_info_des">
                  {chosenProd.prodDescription}
                </div>
                <div className="product_info_action">
                  <Button onClick={handleAddToCart} variant="dark">
                    Add to cart
                  </Button>
                  <Button variant="dark">
                    <i
                      onClick={() =>
                        quantity < chosenProd.prodQuantity &&
                        setQuantity(quantity + 1)
                      }
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
      <ReviewSection listReview={listReview} />
    </>
  );
}

export default ProductDetailPage;

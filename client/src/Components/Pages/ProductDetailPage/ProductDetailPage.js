import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import "./style.scss";
import imgSrc from "../../../assets/img/best_bcaa.png";
import imgSrc4 from "../../../assets/img/best_protein.png";
import imgSrc5 from "../../../assets/img/iso_hd.png";
import imgSrc6 from "../../../assets/img/vegan_protein.png";
import Footer from "../../Footer/Footer";
function ProductDetailPage(props) {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Navbar />
      <div className="product_info_container">
        <div className="product_info_image">
          <img src={imgSrc} alt="abc" />
        </div>
        <div className="product_info_details">
          <div className="product_info_type">Supplement</div>
          <div className="product_info_review">
            <i
              style={{ color: "yellow", marginRight: "5px" }}
              className="fa fa-star"
              aria-hidden="true"
            ></i>
            4.5 (23 Reviews)
          </div>

          <div className="product_info_name">
            BEST BCAA SHREDDED
            <i className="far fa-heart"></i>
          </div>
          <div className="product_info_price">$30</div>
          <div className="product_info_des">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quam natus saepe. Minus, adipisci accusamus. Distinctio molestiae
            corporis fuga nemo, dolorum ipsa, velit natus laudantium
            reprehenderit mollitia consequatur dolorem error.
          </div>
          <div className="product_info_action">
            <Button variant="dark">Add to cart</Button>
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
        <div className="product_related">
          <p className="product_related_title">Similar Products</p>
          <div className="product_related_info">
            <div className="product_related_info_image">
              <img src={imgSrc4} alt="abc" />
            </div>
            <div className="product_related_info_details">
              <div className="product_related_info_name">
                BEST BCAA SHREDDED
              </div>
              <div className="product_related_info_price">$30</div>
            </div>
          </div>
          <div className="product_related_info">
            <div className="product_related_info_image">
              <img src={imgSrc5} alt="abc" />
            </div>
            <div className="product_related_info_details">
              <div className="product_related_info_name">
                BEST BCAA SHREDDED
              </div>
              <div className="product_related_info_price">$30</div>
            </div>
          </div>{" "}
          <div className="product_related_info">
            <div className="product_related_info_image">
              <img src={imgSrc6} alt="abc" />
            </div>
            <div className="product_related_info_details">
              <div className="product_related_info_name">
                BEST BCAA SHREDDED
              </div>
              <div className="product_related_info_price">$30</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetailPage;

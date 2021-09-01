import React from "react";
import { Button } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import "./style.scss";

import image from "../../../assets/img/best_bcaa.png";
import Footer from "../../Footer/Footer";
function ProductDetailPage(props) {
  return (
    <>
      <Navbar />
      <div className="product_info_container">
        <div className="product_info_image">
          <img src={image} alt="abc" />
        </div>
        <div className="product_info_details">
          <div className="product_info_type">Supplement</div>
          <div className="product_info_name">BEST BCAA SHREDDED</div>
          <div className="product_info_price">$30</div>
          <div className="product_info_des">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quam natus saepe. Minus, adipisci accusamus. Distinctio molestiae
            corporis fuga nemo, dolorum ipsa, velit natus laudantium
            reprehenderit mollitia consequatur dolorem error.
          </div>
          <div className="product_info_action">
            <i class="far fa-heart"></i>
            <Button variant="secondary">ADD TO CART</Button>
          </div>
        </div>
        <div className="product_related">
          <p className="product_related_title">Similar Products</p>
          <div className="product_related_info">
            <div className="product_related_info_image">
              <img src={image} alt="abc" />
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
              <img src={image} alt="abc" />
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
              <img src={image} alt="abc" />
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
              <img src={image} alt="abc" />
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
              <img src={image} alt="abc" />
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

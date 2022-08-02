import React from "react";
import Review from "./Review";
import "./style.scss";
import noComment from "../../assets/img/no-comment.png"
import {Divider, Typography} from 'antd';

const { Text } = Typography;

export default function ReviewSection({ listReview }) {
  return (
    <section id="testimonials">
      <div className="testimonial-heading">
        <Divider plain></Divider>
        <span>Reviews</span>
        <h4>Clients Says</h4>
      </div>

        {listReview.length <= 0 ? (
            <div className='d-flex flex-column justify-content-start align-items-center mb-5 pb-5'>
                <img src={noComment} alt=""/>
                <Text style={{fontSize: '1.5rem'}} disabled>There are no reviews yet. Try the product and be the first</Text>
            </div>
        ) : <div className="testimonial-box-container">
            {listReview.map((review, index) => (
                <Review key={index} review={review}/>
            ))}
        </div>}
    </section>
  );
}

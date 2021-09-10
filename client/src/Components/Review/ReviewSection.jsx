import React from "react";
import Review from "./Review";
import "./style.scss";

export default function ReviewSection() {
  return (
    <section id="testimonials">
      <div className="testimonial-heading">
        <span>Comments</span>
        <h4>Clients Says</h4>
      </div>

      <div className="testimonial-box-container">
        {[...Array(9)].map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </section>
  );
}

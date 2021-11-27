import React, { useState } from "react";
import CommentItem from "./CommentItem";
import FormCommentInput from "./FormCommentInput";
const Comments = ({ product, isAddedComment, setIsAddedComment }) => {
  const [rating, setRating] = useState(0);
  return (
    <div className="comments">
      <div className="comments-header">
        <div className="comments-header__title">Đánh giá sản phẩm</div>
        <div className="comments-header__separate"></div>
      </div>
      <div className="comments-body mgt-20">
        <div className="comments-body__rating">
          <div className="label">Đánh giá:</div>
          <div className="rating">
            <input
              type="radio"
              name="rate"
              id="rd-5"
              onChange={() => setRating(5)}
            />
            <label htmlFor="rd-5" className="fas fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rd-4"
              onChange={() => setRating(4)}
            />
            <label htmlFor="rd-4" className="fas fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rd-3"
              onChange={() => setRating(3)}
            />
            <label htmlFor="rd-3" className="fas fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rd-2"
              onChange={() => setRating(2)}
            />
            <label htmlFor="rd-2" className="fas fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rd-1"
              onChange={(e) => setRating(1)}
            />
            <label htmlFor="rd-1" className="fas fa-star"></label>
          </div>
        </div>
        <FormCommentInput rating={rating} productId={product._id} isAddedComment={isAddedComment} setIsAddedComment={setIsAddedComment} />
        <div className="comments-body__list">
          <div className="comments-body__list-header">
            <h3>Bình luận : {product.reviews.length}</h3>
          </div>
          <div className="comments-body__list-body">
            {product.reviews.map((review) => (
              <CommentItem review={review} key={review._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

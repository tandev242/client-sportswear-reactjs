import React, { useState } from "react";
import CommentItem from "./CommentItem";
import FormCommentInput from "./FormCommentInput";
const Comments = ({ product, isAddedComment, setIsAddedComment }) => {
  const [rating, setRating] = useState(0);

  const sortedReviews = product.reviews
    .sort((a, b) => {
      var dateA = new Date(a.createdAt).getTime();
      var dateB = new Date(b.createdAt).getTime();
      return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
    })

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
            <label htmlFor="rd-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </label>
            <input
              type="radio"
              name="rate"
              id="rd-4"
              onChange={() => setRating(4)}
            />
            <label htmlFor="rd-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </label>
            <input
              type="radio"
              name="rate"
              id="rd-3"
              onChange={() => setRating(3)}
            />
            <label htmlFor="rd-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </label>
            <input
              type="radio"
              name="rate"
              id="rd-2"
              onChange={() => setRating(2)}
            />
            <label htmlFor="rd-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </label>
            <input
              type="radio"
              name="rate"
              id="rd-1"
              onChange={() => setRating(1)}
            />
            <label htmlFor="rd-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </label>
          </div>
        </div>
        <FormCommentInput
          rating={rating}
          productId={product._id}
          isAddedComment={isAddedComment}
          setIsAddedComment={setIsAddedComment}
        />
        <div className="comments-body__list">
          <div className="comments-body__list-header">
            <h3>Bình luận : {product.reviews.length}</h3>
          </div>
          <div className="comments-body__list-body">
            {sortedReviews.map((review) => (
              <CommentItem review={review} key={review._id} />
            ))}
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Comments;

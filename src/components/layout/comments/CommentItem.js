import React from "react";

const CommentItem = ({ review }) => {
  const rate = 100 - review.rating * 20;
  const starStyle = {
    clipPath: `inset(0 ${rate}% 0 0)`,
  };
  const FormatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();
    const dateTime = new Date(Date.UTC(year, month, day, hour, minute, second));

    return new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(dateTime);
  };
  return (
    <div className="comment-item">
      <div className="info">
        <img src={review.user.profilePicture} alt="" />
        <p className="info-name">{review.user.name}</p>
      </div>
      <div className="content">
        <div className="rating">
          <div className="star">
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <div className="star-1" style={starStyle}>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </div>
        </div>
        <p className="content-body">{review.comment}</p>
      </div>
      <div className="create-date">
        <span>Tạo lúc: {FormatDate(review.createdAt)}</span>
      </div>
    </div>
  );
};

export default CommentItem;

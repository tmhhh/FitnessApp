import React from "react";

const review = {
  _id: { $oid: "613b460ecd6fbb166ac64d2e" },
  of_product: { $oid: "6136f9e53fb6a889f6374843" },
  content: "Này bth",
  like: { count: 0, people: [] },
  rating: 3,
  createdAt: "2021-09-10T11:48:30.670Z",
  updatedAt: { $date: "2021-09-10T11:48:30.670Z" },
  __v: 0,
  user: {
    _id: { $oid: "61387a949d2fdabb5242afa1" },
    userNameID: "tmh2",
    userName: "Hoang",
    userPassword:
      "$argon2i$v=19$m=4096,t=3,p=1$+W9GUraoSulHTRcjuiSfhg$8G52b/AAf+uyRdYsr0JG6hLo7E8CEcj7cqDEcVXKoK4",
    userImage: "abc",
    userCart: [
      { product: { $oid: "6134e1c7aa161d69e5cbee04" }, quantity: 3 },
      { product: { $oid: "6134e246aa161d69e5cbee06" }, quantity: 1 },
      { product: { $oid: "6134e26faa161d69e5cbee08" }, quantity: 1 },
    ],
    __v: 0,
  },
};

export default function Review() {
  const { user, content, rating, like, createdAt } = review;
  return (
    <>
      <div className="testimonial-box">
        <div className="box-top">
          <div className="profile">
            <div className="profile-img">
              <img
                alt="avatar"
                src={
                  // user.userImage ||
                  "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
                }
              />
            </div>
            <div className="name-user">
              <strong>{user.userName}</strong>
              <span>{createdAt}</span>
            </div>
          </div>
          <div className="reviews">
            {[...Array(5)].map((_, index) =>
              index + 1 <= Math.round(rating) ? (
                <i className="fas fa-star"></i>
              ) : (
                <i className="far fa-star"></i>
              )
            )}
          </div>
        </div>
        <div className="client-comment">
          <p>{content}</p>
        </div>
        <div className="review-like">
          <span className="like-btn">👍</span>
          <span className="ms-1" style={{ color: "grey" }}>
            {like.count}
          </span>
        </div>
      </div>
    </>
  );
}

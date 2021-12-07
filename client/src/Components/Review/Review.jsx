import { USER_IMAGE_BASE_URL } from "assets/constants";
import React from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { likeReview } from "../../redux/slices/reviewSlice";

// const review = {
//   _id: "613b460ecd6fbb166ac64d2e",
//   of_product: { $oid: "6136f9e53fb6a889f6374843" },
//   content: "Này bth",
//   like: {
//     count: 2,
//     // people: ["6137438552340cf27977657f", "61387a949d2fdabb5242afa1"],
//     people: ["61387a949d2fdabb5242afa1"],
//   },
//   rating: 3,
//   createdAt: "2021-09-10T11:48:30.670Z",
//   updatedAt: { $date: "2021-09-10T11:48:30.670Z" },
//   __v: 0,
//   user: {
//     _id: { $oid: "61387a949d2fdabb5242afa1" },
//     userNameID: "tmh2",
//     userName: "Hoang",
//     userPassword:
//       "$argon2i$v=19$m=4096,t=3,p=1$+W9GUraoSulHTRcjuiSfhg$8G52b/AAf+uyRdYsr0JG6hLo7E8CEcj7cqDEcVXKoK4",
//     userImage: "abc",
//     userCart: [
//       { product: { $oid: "6134e1c7aa161d69e5cbee04" }, quantity: 3 },
//       { product: { $oid: "6134e246aa161d69e5cbee06" }, quantity: 1 },
//       { product: { $oid: "6134e26faa161d69e5cbee08" }, quantity: 1 },
//     ],
//     __v: 0,
//   },
// };

export default function Review({ review }) {
  const dispatch = useDispatch();
  const { _id, user, content, rating, like, createdAt } = review;
  const curUser = useSelector((state) => state.authReducer.userInfo);
  const handleLikeClick = async () => {
    await dispatch(likeReview(_id));
  };
  return (
    <>
      <div className="testimonial-box">
        <div className="box-top">
          <div className="profile">
            <div className="profile-img">
              <img
                alt="avatar"
                src={USER_IMAGE_BASE_URL + "/" + curUser.userImage}
              />
            </div>
            <div className="name-user">
              <strong>{user.userName}</strong>
              <span style={{ fontSize: "1.3rem" }}>
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="reviews">
            {[...Array(5)].map((_, index) =>
              index + 1 <= Math.round(rating) ? (
                <i key={"star" + index} className="fas fa-star"></i>
              ) : (
                <i key={"star" + index} className="far fa-star"></i>
              )
            )}
          </div>
        </div>
        <div className="client-comment">
          <p style={{ fontSize: "1.3rem" }}>{content}</p>
        </div>
        <div className="review-like d-flex align-items-center">
          {like?.people?.indexOf(curUser?._id) < 0 ? (
            <Badge className="like-btn" bg="primary" onClick={handleLikeClick}>
              👍 Like
            </Badge>
          ) : (
            <Badge className="like-btn" bg="secondary">
              Liked
            </Badge>
          )}
          <span className="ms-1" style={{ color: "grey" }}>
            {like.count}
          </span>
        </div>
      </div>
    </>
  );
}

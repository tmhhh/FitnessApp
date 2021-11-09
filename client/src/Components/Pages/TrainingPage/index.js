import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPosts, getPostsByAuthor } from "../../../redux/slices/postSlice";
import ExerciseCard from "../../Card/ExerciseCard";
import PostContainer from "../../Post/PostContainer";
import TrainingModal from "./TrainingModal";
import "./style.scss";

export default function Training() {
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.postReducer.listPost);
  const history = useHistory();
  const [isAll, setIsAll] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(getPosts());
    })();
  }, [dispatch]);
  const fetchYourPost = async () => {
    await dispatch(getPostsByAuthor());
    setIsAll(false);
  };
  const onSeeAll = async () => {
    await dispatch(getPosts());
    setIsAll(true);
  };

  //EXERCISE MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div style={{ marginTop: "100px" }} className="exercise__page-container">
        <ExerciseCard
          info={{
            title: "Push Up",
            img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559051302/programs/53/1559051292.jpg",
            muscleTags: "Chest",
          }}
          handleShowModal={handleShow}
        />
        <ExerciseCard
          info={{
            img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559051302/programs/53/1559051292.jpg",
            title: "Handstand Technique Guide",
            muscleTags: "Chest",
          }}
          handleShowModal={handleShow}
        />
        <ExerciseCard
          info={{
            img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050689/programs/55/1559050678.jpg",
            title: "Muscle Up Technique Guide",
            muscleTags: "Chest",
          }}
          handleShowModal={handleShow}
        />
        <ExerciseCard
          info={{
            img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050975/programs/56/1559050923.jpg",
            title: "Pullover Technique Guide",
            muscleTags: "Chest",
          }}
          handleShowModal={handleShow}
        />
        <ExerciseCard
          info={{
            img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050689/programs/55/1559050678.jpg",
            title: "Muscle Up Technique Guide",
            muscleTags: "Chest",
          }}
          handleShowModal={handleShow}
        />
        <ExerciseCard
          info={{
            img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050975/programs/56/1559050923.jpg",
            title: "Pullover Technique Guide",
            muscleTags: "Chest",
          }}
          handleShowModal={handleShow}
        />
        <TrainingModal handleClose={handleClose} show={show} />
      </div>
    </>
  );
}

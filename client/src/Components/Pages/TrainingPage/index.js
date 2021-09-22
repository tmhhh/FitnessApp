import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPosts } from "../../../redux/slices/postSlice";
import ExerciseCard from "../../Card/ExerciseCard";
import PostContainer from "../../Post/PostContainer";
import "./style.scss";

export default function Training() {
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.postReducer.listPost);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      await dispatch(getPosts());
    })();
  }, [dispatch]);
  return (
    <>
      <div style={{ marginTop: "100px" }} className="container">
        <Tabs
          defaultActiveKey="Chest"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Chest" title="Chest">
            <div className="card_wrapper">
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559051302/programs/53/1559051292.jpg",
                  title: "Handstand Technique Guide",
                  tag: "Beginner",
                }}
              />
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050689/programs/55/1559050678.jpg",
                  title: "Muscle Up Technique Guide",
                  tag: "Intermediate",
                }}
              />
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050975/programs/56/1559050923.jpg",
                  title: "Pullover Technique Guide",
                  tag: "Professional",
                }}
              />
            </div>
            <div className="card_wrapper">
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559051302/programs/53/1559051292.jpg",
                  title: "Handstand Technique Guide",
                  tag: "Beginner",
                }}
              />
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050689/programs/55/1559050678.jpg",
                  title: "Muscle Up Technique Guide",
                  tag: "Intermediate",
                }}
              />
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050975/programs/56/1559050923.jpg",
                  title: "Pullover Technique Guide",
                  tag: "Professional",
                }}
              />
            </div>
          </Tab>
          <Tab eventKey="Back" title="Back">
            <div className="card_wrapper">
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559051302/programs/53/1559051292.jpg",
                  title: "Handstand Technique Guide",
                  tag: "Beginner",
                }}
              />
            </div>
          </Tab>
          <Tab eventKey="Legs" title="Legs">
            <div className="card_wrapper">
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559051302/programs/53/1559051292.jpg",
                  title: "Handstand Technique Guide",
                  tag: "Beginner",
                }}
              />
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050689/programs/55/1559050678.jpg",
                  title: "Muscle Up Technique Guide",
                  tag: "Intermediate",
                }}
              />
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050975/programs/56/1559050923.jpg",
                  title: "Pullover Technique Guide",
                  tag: "Professional",
                }}
              />
            </div>
            <div className="card_wrapper">
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559051302/programs/53/1559051292.jpg",
                  title: "Handstand Technique Guide",
                  tag: "Beginner",
                }}
              />
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050689/programs/55/1559050678.jpg",
                  title: "Muscle Up Technique Guide",
                  tag: "Intermediate",
                }}
              />
              <ExerciseCard
                info={{
                  img: "https://res.cloudinary.com/thenx-production/image/upload/w_450/v1559050975/programs/56/1559050923.jpg",
                  title: "Pullover Technique Guide",
                  tag: "Professional",
                }}
              />
            </div>
          </Tab>
        </Tabs>
        <button
          className="button3D p-3"
          style={{ width: "fit-content", border: "3px solid black" }}
          onClick={() => {
            history.push("/create-post");
          }}
        >
          Write your posts ⚡
        </button>
        <PostContainer listPost={listPost} />
      </div>
    </>
  );
}

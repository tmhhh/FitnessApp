import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPosts, getPostsByAuthor } from "../../../redux/slices/postSlice";
import ExerciseCard from "../../Card/ExerciseCard";
import PostContainer from "../../Post/PostContainer";
import TrainingModal from "./TrainingModal";
import "./style.scss";
import SearchBar from "../../Common/SearchBar";

export default function Training() {
  const dispatch = useDispatch();
  const { listExercises, exerciseLoading } = useSelector(
    (state) => state.exerciseReducer
  );
  const [listExercisesCop, setListExercisesCop] = useState([]);
  useEffect(() => {
    setListExercisesCop(listExercises);
  }, [listExercises]);
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
  const [show, setShow] = useState({
    isShow: false,
    selectedExercise: {},
  });
  const handleClose = () => setShow({ ...show, isShow: false });
  const handleShow = (id) =>
    setShow({
      isShow: true,
      selectedExercise: listExercises.find(
        (e) => e._id.toString() === id.toString()
      ),
    });

  let listCate = [];
  let listMuscles = [];
  for (const exercise of listExercises) {
    if (!listCate.includes(exercise.category)) {
      listCate.push(exercise.category);
    }
    for (const muscle of exercise.muscleActivate) {
      if (!listMuscles.includes(muscle)) listMuscles.push(muscle);
    }
  }
  // HANDLE FILTER
  const handleSearchByCate = (cate) => {
    setListExercisesCop(listExercises.filter((e) => e.category === cate));
  };
  const handleSearchByMuscleActivate = (muscleName) => {
    setListExercisesCop(
      listExercises.filter((e) => {
        return e.muscleActivate.find((muscle) => muscle === muscleName);
      })
    );
  };
  return (
    <div className="exercise__page__container">
      <div className="exercise__sidebar__container">
        <div className="sidebar__title">Category</div>
        <div className="sidebar__items">
          {listCate.map((e) => (
            <div onClick={() => handleSearchByCate(e)} className="sidebar_item">
              {e}
            </div>
          ))}
        </div>
        <div className="sidebar__title">Muscles</div>
        <div className="sidebar__items">
          {listMuscles.map((e) => (
            <div
              onClick={() => handleSearchByMuscleActivate(e)}
              className="sidebar_item"
            >
              {e}
            </div>
          ))}
        </div>
      </div>
      <div className="exercise__container">
        <SearchBar
          listExercises={listExercises}
          setListExercisesCop={setListExercisesCop}
        />
        {exerciseLoading ? (
          <Spinner
            style={{ position: "absolute", left: "50%", top: "50%" }}
            animation="border"
            variant="info"
          />
        ) : (
          <div className="card__wrapper">
            {listExercisesCop.map((e) => (
              <ExerciseCard
                info={{
                  title: e.name,
                  img: e.thumbnail,
                  muscleTags: e.muscleActivate,
                }}
                handleShowModal={() => handleShow(e._id)}
              />
            ))}
          </div>
        )}
        <TrainingModal handleClose={handleClose} show={show} />
      </div>
    </div>
  );
}

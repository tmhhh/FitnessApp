import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPosts, getPostsByAuthor } from "../../../redux/slices/postSlice";
import ExerciseCard from "../../Card/ExerciseCard";
import PostContainer from "../../Post/PostContainer";
import TrainingModal from "./TrainingModal";
import "./style.scss";
import SearchBar from "../../Common/SearchBar";
import userApi from "../../../api/userApi";
import authSlice from "../../../redux/slices/authSlice";
import { Context } from "../../../Contexts";
export default function Training() {
  const dispatch = useDispatch();
  const { listExercises, exerciseLoading } = useSelector(
    (state) => state.exerciseReducer
  );
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const [listExercisesCop, setListExercisesCop] = useState([]);
  const { setToast } = useContext(Context);

  useEffect(() => {
    setListExercisesCop(listExercises);
  }, [listExercises]);

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
  //DATE PICKER MODAL
  const [datePickerModalShow, setDatePickerModalShow] = useState(false);
  const handleCloseDatePickerModal = () => {
    setDatePickerModalShow(false);
    setShow({ ...show, isShow: true });
  };
  const handleOpenDatePickerModal = () => {
    setDatePickerModalShow(true);
    setShow({ ...show, isShow: false });
  };

  //HANDLE ADD TO TRAINING PLAN
  const handleAddToTrainingSchedule = async (id, addedDate) => {
    try {
      setToast({
        toastShow: true,
        title: "Login ...",
        content: "Please wait a second",
        icon: "👀",
        bg: "info",
      });
      if (!isAuthenticated)
        return setToast({
          toastShow: true,
          title: "Failed to add !!!",
          content: "Please login to do this  !!!",
          icon: "❌",
          bg: "danger",
        });
      const res = await userApi.addToWorkoutSchedule(
        id,
        addedDate.toLocaleDateString()
      );
      if (res.data.isSuccess) {
        console.log(res.data.addedExercise);
        dispatch(
          authSlice.actions.addToWorkoutSchedule({
            addedExercise: res.data.addedExercise,
          })
        );
        handleCloseDatePickerModal();
        setToast({
          toastShow: true,
          title: "Add successfully !!!",
          content: "Enjoy !!!",
          icon: "✔",
          bg: "success",
        });
      }
    } catch (error) {
      if (error.response.status === 400)
        return setToast({
          toastShow: true,
          title: "Failed to add !!!",
          content: error.response.data.message,
          icon: "❌",
          bg: "danger",
        });
      setToast({
        toastShow: true,
        title: "Failed to add !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
    }
  };

  //
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
        <TrainingModal
          handleOpenDatePickerModal={handleOpenDatePickerModal}
          handleCloseDatePickerModal={handleCloseDatePickerModal}
          datePickerModalShow={datePickerModalShow}
          handleAddToTrainingSchedule={handleAddToTrainingSchedule}
          handleAddToTrainingSchedule={handleAddToTrainingSchedule}
          handleClose={handleClose}
          show={show}
        />
      </div>
    </div>
  );
}

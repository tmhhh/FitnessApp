import RecommendOption from "components/Common/RecommendOption";
import SearchBarV2 from "components/Common/SearchBarV2";
import messageAntd, { messageTypes } from "components/Common/Toast/message";
import useDebounce from "hooks/useDebounce";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../../api/userApi";
import exerciseLottie from "../../../assets/lottie/workout.json";
import authSlice from "../../../redux/slices/authSlice";
import ExerciseCard from "../../Card/ExerciseCard";
import NoResults from "../../Common/Placeholders/NoResults";
import "./style.scss";
import TrainingModal from "./TrainingModal";
export default function Training() {
  const debounce = useDebounce();
  const dispatch = useDispatch();
  const { listExercises, exerciseLoading } = useSelector(
    (state) => state.exerciseReducer
  );
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const [listExercisesCop, setListExercisesCop] = useState([]);
  const [listRecommendOptions, setListRecommendOptions] = useState([]);

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  //HANDLE ADD TO TRAINING PLAN
  const handleAddToTrainingSchedule = async (addedDate) => {
    try {
      console.log({ addedDate });
      messageAntd(messageTypes.loading, "Adding ....");
      if (!isAuthenticated)
        return messageAntd(messageTypes.error, "Failed to add !!!");

      const res = await userApi.addToWorkoutSchedule(
        show.selectedExercise._id,
        new Date(addedDate._d).toLocaleDateString()
      );
      if (res.data.isSuccess) {
        console.log(res.data.addedExercise);
        dispatch(
          authSlice.actions.addToWorkoutSchedule({
            addedExercise: res.data.addedExercise,
          })
        );
        handleClose();
        messageAntd(messageTypes.success, "Add successfully !!!");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        return messageAntd(messageTypes.error, error.response.data.message);
      }
      messageAntd(messageTypes.error, "Failed to add !!!");
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

  //
  const handleInputChange = (e) => {
    const searchValue = e.target.value.toUpperCase();
    debounce(() => {
      if (searchValue.trim() !== "") {
        setListRecommendOptions(
          listExercisesCop.filter((e) =>
            e.name.toUpperCase().includes(searchValue)
          )
        );
      } else {
        setListRecommendOptions([]);
      }
    }, 1000);
  };
  return (
    <div className="exercise__page__container">
      <Helmet>
        <title>Exercise Training</title>
        <meta name="description" content="World of training" />
      </Helmet>
      <div className="exercise__sidebar__container">
        <div className="sidebar__title">Category</div>
        <div className="sidebar__items">
          {listCate.map((e) => (
            <div
              onClick={() => handleSearchByCate(e)}
              className="sidebar_item common-hover"
            >
              {e}
            </div>
          ))}
        </div>
        <div className="sidebar__title">Muscles</div>
        <div className="sidebar__items">
          {listMuscles.map((e) => (
            <div
              onClick={() => handleSearchByMuscleActivate(e)}
              className="sidebar_item common-hover"
            >
              {e}
            </div>
          ))}
        </div>
      </div>
      <div className="exercise__container">
        <div className="search-box-container">
          <SearchBarV2
            placeholder="Ex: Shoulder Press,..."
            onChange={handleInputChange}
          />
          <div className="recommend-options-container">
            {listRecommendOptions.map((item) => (
              <RecommendOption
                onClick={() => handleShow(item._id)}
                image={item.thumbnail}
                name={item.name}
                description={item.description}
              />
            ))}
          </div>
        </div>
        {exerciseLoading ? (
          // <Spinner
          //   style={{ position: "absolute", left: "50%", top: "50%" }}
          //   animation="border"
          //   variant="info"
          // />
          <Lottie
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            animationData={exerciseLottie}
          />
        ) : (
          <div
            className={
              listExercisesCop.length >= 6
                ? "card__wrapper"
                : "card__wrapper card__wrapper-none-grid"
            }
          >
            {listExercisesCop.length === 0 ? (
              <NoResults />
            ) : (
              listExercisesCop.map((e) => (
                <ExerciseCard
                  useGrid={listExercisesCop.length >= 6}
                  info={{
                    title: e.name,
                    img: e.thumbnail,
                    muscleTags: e.muscleActivate,
                  }}
                  handleShowModal={() => handleShow(e._id)}
                />
              ))
            )}
          </div>
        )}
        <TrainingModal
          handleShowDatePicker={handleShowDatePicker}
          onOk={handleAddToTrainingSchedule}
          handleClose={handleClose}
          show={show}
          showDatePicker={showDatePicker}
        />
      </div>
    </div>
  );
}

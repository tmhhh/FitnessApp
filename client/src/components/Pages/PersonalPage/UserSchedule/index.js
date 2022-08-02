import messageAntd, { messageTypes } from "components/Common/Toast/message";
import TrainingModal from "components/Pages/TrainingPage/TrainingModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userApi from "../../../../api/userApi";
import authSlice from "../../../../redux/slices/authSlice";
import "./style.scss";

import Schedule from "./components/Schedule";
export default function UserSchedule({
  isAuthenticated,
  workoutSchedule,
  trackingInfo,
}) {
  // const {
  //   userGender,
  //   userAge,
  //   userHeight,
  //   userActivityLevel,
  //   userGoal,
  //   trackingFood,
  // } = trackingInfo;
  const dispatch = useDispatch();
  const [date, setDate] = useState([]);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [page, setPage] = useState(0);

  //
  useEffect(() => {
    const listDate = [];
    for (let i = 0; i <= 13; i++) {
      var curr = new Date();
      var firstday = new Date(
        curr.setDate(curr.getDate() - curr.getDay() + i + 7 * page)
      );
      listDate.push(firstday);
    }
    setDate(listDate);
  }, [page]);
  //
  const handleRemoveFromTrainingSchedule = async (event, id, createdDate) => {
    try {
      event.stopPropagation(); // STOP PARENT EVENT TRIGGER
      messageAntd(messageTypes.loading, "Removing ...");
      if (!isAuthenticated)
        return messageAntd(messageTypes.error, "Failed to remove !!!");

      const res = await userApi.removeFromWorkoutSchedule(id, createdDate);
      if (res.data.isSuccess) {
        dispatch(
          authSlice.actions.removeFromWorkoutSchedule({
            removedExercise: res.data.removedExercise,
            createdDate: res.data.createdDate,
          })
        );
        return messageAntd(messageTypes.success, "Remove successfully !!!");
      }
    } catch (error) {
      console.log(error);
      messageAntd(messageTypes.error, "Failed to remove !!!");
    }
  };
  // TRAINING MODAL
  const [show, setShow] = useState({
    isShow: false,
    selectedExercise: {},
  });

  const handleOnClickExercise = (exerciseId) => {
    const selectedExercise = workoutSchedule.find(
      (item) => item.exercise?._id === exerciseId
    ).exercise;
    console.log({ selectedExercise });
    setShow({
      isShow: true,
      selectedExercise,
    });
  };
  const handleCloseExerciseModal = () => {
    setShow({ ...show, isShow: false });
  };
  const handleAddToTrainingSchedule = async (addedDate) => {
    try {
      messageAntd(messageTypes.loading, "Adding ....");
      if (!isAuthenticated)
        return messageAntd(messageTypes.error, "Failed to add !!!");

      const res = await userApi.addToWorkoutSchedule(
        show.selectedExercise._id,
        new Date(addedDate._d).toLocaleDateString()
      );
      if (res.data.isSuccess) {
        dispatch(
          authSlice.actions.addToWorkoutSchedule({
            addedExercise: res.data.addedExercise,
          })
        );
        handleCloseExerciseModal();
        messageAntd(messageTypes.success, "Add successfully !!!");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        return messageAntd(messageTypes.error, error.response.data.message);
      }
      messageAntd(messageTypes.error, "Failed to add !!!");
    }
  };
  //DATA PICKER
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <div className="schedule__container">
      <div className="schedule__header">
        <h3 className="schedule__header-title">
          {new Date().getDate() + ", " + monthNames[new Date().getMonth()]}
        </h3>
        <div className="schedule__header__buttons">
          <i
            onClick={() => setPage(page - 1)}
            className="decrease-btn fas fa-chevron-left"
          ></i>
          <i className="dot fas fa-circle"></i>
          <i
            onClick={() => setPage(page + 1)}
            className="increase-btn fas fa-chevron-right"
          ></i>
        </div>
        <p className="schedule__header-description">
          Here all your planned events. You will find information for each event
          as well you can planned new one
        </p>
      </div>
      <div className="schedule__items">
        {date.map((item, index) => (
          <Schedule
            key={index}
            days={days}
            date={item}
            onClickExercise={handleOnClickExercise}
            onRemoveFromTrainingSchedule={handleRemoveFromTrainingSchedule}
            workoutSchedule={workoutSchedule}
            trackingInfo={trackingInfo}
          />
        ))}
      </div>
      <TrainingModal
        show={show}
        handleClose={handleCloseExerciseModal}
        handleShowDatePicker={handleShowDatePicker}
        onOk={handleAddToTrainingSchedule}
        showDatePicker={showDatePicker}
      />
    </div>
  );
}

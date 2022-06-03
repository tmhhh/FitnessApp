import { Tabs } from "antd";
import messageAntd, { messageTypes } from "Components/Common/Toast/message";
import TrainingModal from "Components/Pages/TrainingPage/TrainingModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userApi from "../../../../api/userApi";
import authSlice from "../../../../redux/slices/authSlice";
import "./style.scss";
import { calculateTotalCaloriesNeeded } from "../../../../utils/calculate";
const { TabPane } = Tabs;
export default function UserSchedule({
  isAuthenticated,
  workoutSchedule,
  trackingInfo,
}) {
  const {
    userGender,
    userAge,
    userHeight,
    userActivityLevel,
    userGoal,
    trackingFood,
  } = trackingInfo;
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
      (item) => item.exercise._id === exerciseId
    ).exercise;
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
        {date.map((e) => (
          <div className="schedule__item">
            <div
              className={
                e.toLocaleDateString() === new Date().toLocaleDateString()
                  ? "schedule__item-top same-day"
                  : "schedule__item-top "
              }
            >
              {days[e.getDay()]}
            </div>
            <div
              className={`schedule__item-body ${
                e.toLocaleDateString() === new Date().toLocaleDateString() &&
                " same-date"
              }`}
            >
              {e.getDate()}
            </div>
            <div className="schedule__item-bottom">
              <Tabs defaultActiveKey="2">
                <TabPane tab="Training" key="1">
                  {workoutSchedule.find(
                    (item) => item.createdDate === e.toLocaleDateString()
                  ) ? (
                    workoutSchedule
                      .filter(
                        (schedule) =>
                          schedule.createdDate === e.toLocaleDateString()
                      )
                      .map((ele) => (
                        <div
                          onClick={() =>
                            handleOnClickExercise(ele.exercise._id)
                          }
                          className="schedule__item__task"
                        >
                          <p className="schedule__item__task-title">
                            {ele.exercise.name}
                          </p>

                          {ele.exercise.muscleActivate.map((muscle, index) =>
                            index < ele.exercise.muscleActivate.length - 1 ? (
                              <span className="schedule__item__task-time">
                                {muscle} -
                              </span>
                            ) : (
                              <span className="schedule__item__task-time">
                                {muscle}
                                <i
                                  onClick={(event) =>
                                    handleRemoveFromTrainingSchedule(
                                      event,
                                      ele.exercise._id,
                                      e.toLocaleDateString()
                                    )
                                  }
                                  className="far fa-trash-alt"
                                ></i>
                              </span>
                            )
                          )}
                        </div>
                      ))
                  ) : (
                    <p>You haven't added exercise yet</p>
                  )}
                </TabPane>
                <TabPane tab="Diet" key="2">
                  <p>Your achievement:</p>
                  <p>
                    {calculateTotalCaloriesNeeded(
                      userGender,
                      userAge,
                      userHeight,
                      userActivityLevel,
                      userGoal
                    )}
                  </p>
                  {/* {trackingFood
                    .filter((item) => item.addedDate === e.toLocaleDateString())
                    .listFoods.map((food) => (
                      <p>{food.foodName}</p>
                    ))} */}
                </TabPane>
              </Tabs>
            </div>
          </div>
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

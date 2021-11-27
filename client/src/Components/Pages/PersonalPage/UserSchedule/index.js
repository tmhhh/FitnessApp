import "./style.scss";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../../../Contexts";
import { useSelector, useDispatch } from "react-redux";
import userApi from "../../../../api/userApi";
import authSlice from "../../../../redux/slices/authSlice";
export default function UserSchedule() {
  const [date, setDate] = useState([]);
  const dispatch = useDispatch();
  const { setToast } = useContext(Context);
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
  const {
    isAuthenticated,
    userInfo: { workoutSchedule },
  } = useSelector((state) => state.authReducer);
  const [page, setPage] = useState(0);
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

  const handleRemoveFromTrainingSchedule = async (id, createdDate) => {
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
          title: "Failed to remove !!!",
          content: "Please login to do this   !!!",
          icon: "❌",
          bg: "danger",
        });
      const res = await userApi.removeFromWorkoutSchedule(id, createdDate);
      if (res.data.isSuccess) {
        console.log(res.data);
        dispatch(
          authSlice.actions.removeFromWorkoutSchedule({
            removedExercise: res.data.removedExercise,
            createdDate: res.data.createdDate,
          })
        );
        setToast({
          toastShow: true,
          title: "Remove successfully !!!",
          content: "Enjoy !!!",
          icon: "✔",
          bg: "success",
        });
      }
    } catch (error) {
      console.log(error);
      setToast({
        toastShow: true,
        title: "Failed to remove !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
    }
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
              {workoutSchedule
                .filter(
                  (schedule) => schedule.createdDate === e.toLocaleDateString()
                )
                .map((ele) => (
                  <div className="schedule__item__task">
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
                          {muscle}{" "}
                          <i
                            onClick={() =>
                              handleRemoveFromTrainingSchedule(
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
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

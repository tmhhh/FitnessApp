import React from "react";
import { Spinner, OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "antd";
import {
  calculateTotalCaloriesNeeded,
  calculateFoodTotalKCAL,
} from "../../../../utils/calculate";
import "./style.scss";
export default function TrackingSidebar({
  isAuthenticated,
  authLoading,
  userInfo,
  handleShowTrackingModal,
  handleRemoveTrackingFood,
  todayCaloriesWorkout,
}) {
  //
  let body = null;
  if (authLoading) {
    body = <Spinner className="tracking_sidebar_noti" animation="grow" />;
  } else if (!isAuthenticated) {
    body = (
      <h3 className="tracking_sidebar_noti">
        Login to use this feature <i className="fas fa-exclamation-circle"></i>
      </h3>
    );
  } else if (
    !authLoading &&
    isAuthenticated &&
    userInfo.trackingInfo.isFilled
  ) {
    const caloriesGoal = calculateTotalCaloriesNeeded(
      userInfo.trackingInfo.userGender,
      userInfo.trackingInfo.userAge,
      userInfo.trackingInfo.userHeight,
      userInfo.trackingInfo.userWeight,
      userInfo.trackingInfo.userActivityLevel,
      userInfo.trackingInfo.userGoal
    );
    const todayListFoods = userInfo.trackingInfo.trackingFood.find(
      (item) => item.addedDate === new Date().toLocaleDateString()
    );
    const caloriesFood = todayListFoods
      ? calculateFoodTotalKCAL(todayListFoods.listFoods)
      : 0;
    const caloriesRemaining =
      caloriesGoal - caloriesFood + todayCaloriesWorkout;

    console.log({ todayListFoods });
    body = (
      <>
        <div className="tracking_sidebar_header">
          <div className="tracking_sidebar_label">Calories Remaining</div>
          <i
            onClick={handleShowTrackingModal}
            className="fas fa-ellipsis-v"
          ></i>
        </div>
        <div className="tracking_count_container">
          <div className="tracking_count">
            <div className="tracking_count_value">{caloriesGoal}</div>
            <div className="tracking_count_label">Goal</div>
          </div>
          <div className="tracking_count_operator">=</div>
          <div className="tracking_count">
            <div className="tracking_count_value">{caloriesFood}</div>
            <div className="tracking_count_label">Food</div>
          </div>
          <div className="tracking_count_operator">-</div>

          <div className="tracking_count">
            <div className="tracking_count_value">{todayCaloriesWorkout}</div>
            <div className="tracking_count_label">Exercise</div>
          </div>
          <div className="tracking_count_operator">+</div>
          <div className="tracking_count ">
            <Tooltip
              title={
                caloriesRemaining > 0
                  ? "Your diet is going very well. Keep going !"
                  : "Warning !!! You have passed over your daily intake"
              }
              color={caloriesRemaining > 0 ? "green" : "red"}
              placement="right"
            >
              <div
                className={`tracking_count_value ${
                  caloriesRemaining > 0 ? "positive" : "negative"
                }`}
              >
                {caloriesRemaining}
              </div>
            </Tooltip>
            <div className="tracking_count_label">Remaining</div>
          </div>
        </div>
        <div className="tracking_meal_container">
          <div className="tracking_meal">
            <div className="tracking_meal_label">BREAKFAST</div>

            {todayListFoods?.listFoods
              .filter((item) => item.mealType === 0)
              .map((e) => (
                <div
                  style={{ marginLeft: "40px" }}
                  className=" tracking_meal_info d-flex justify-content-evenly "
                >
                  <div className="tracking_meal_close_button d-flex justify-content-between align-items-center">
                    <i
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleRemoveTrackingFood(e.id)}
                      className="fas fa-times"
                    ></i>
                    {/* <input
                      style={{ width: "30px", borderStyle: "none" }}
                      type="number"
                    /> */}
                  </div>

                  <div
                    style={{
                      width: "50%",
                      marginLeft: "30px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "#999",
                      minWidth: "200px",
                    }}
                    className="tracking_meal_info_label"
                  >
                    {e.foodName} ({e.foodServing * 100}g)
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "17px",
                      fontWeight: "500",
                      marginRight: "10px",
                    }}
                    className="tracking_meal_info_value w-50"
                  >
                    {Math.trunc(e.foodKCAL * e.foodServing)}
                  </div>
                </div>
              ))}
          </div>
          <div className="tracking_meal">
            <div className="tracking_meal_label">LUNCH</div>
            <div className="tracking_meal_info">
              {todayListFoods?.listFoods
                .filter((item) => item.mealType === 1)
                .map((e) => (
                  <div
                    style={{ marginLeft: "40px" }}
                    className=" tracking_meal_info d-flex justify-content-evenly "
                  >
                    <div className="tracking_meal_close_button d-flex justify-content-between align-items-center">
                      <i
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() =>
                          handleRemoveTrackingFood(e.id, e.foodServing, 1)
                        }
                        className="fas fa-times"
                      ></i>
                      {/* <input
                      style={{ width: "30px", borderStyle: "none" }}
                      type="number"
                    /> */}
                    </div>

                    <div
                      style={{
                        width: "50%",
                        marginLeft: "30px",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#999",
                        minWidth: "200px",
                      }}
                      className="tracking_meal_info_label"
                    >
                      {e.foodName} ({e.foodServing * 100}g)
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: "500",
                        marginRight: "10px",
                      }}
                      className="tracking_meal_info_value w-50"
                    >
                      {Math.trunc(e.foodKCAL * e.foodServing)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="tracking_meal">
            <div className="tracking_meal_label">SNACKS</div>
            {todayListFoods?.listFoods
              .filter((item) => item.mealType === 2)
              .map((e) => (
                <div
                  style={{ marginLeft: "40px" }}
                  className=" tracking_meal_info d-flex justify-content-evenly "
                >
                  <div className="tracking_meal_close_button d-flex justify-content-between align-items-center">
                    <i
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() =>
                        handleRemoveTrackingFood(e.id, e.foodServing, 2)
                      }
                      className="fas fa-times"
                    ></i>
                    {/* <input
                      style={{ width: "30px", borderStyle: "none" }}
                      type="number"
                    /> */}
                  </div>

                  <div
                    style={{
                      width: "50%",
                      marginLeft: "30px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "#999",
                      minWidth: "200px",
                    }}
                    className="tracking_meal_info_label"
                  >
                    {e.foodName} ({e.foodServing * 100}g)
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "17px",
                      fontWeight: "500",
                      marginRight: "10px",
                    }}
                    className="tracking_meal_info_value w-50"
                  >
                    {Math.trunc(e.foodKCAL * e.foodServing)}
                  </div>
                </div>
              ))}
          </div>
          <div className="tracking_meal">
            <div className="tracking_meal_label">DINNER</div>
            {todayListFoods?.listFoods
              .filter((item) => item.mealType === 3)
              .map((e) => (
                <div
                  style={{ marginLeft: "40px" }}
                  className=" tracking_meal_info d-flex justify-content-evenly "
                >
                  <div className="tracking_meal_close_button d-flex justify-content-between align-items-center">
                    <i
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() =>
                        handleRemoveTrackingFood(e.id, e.foodServing, 3)
                      }
                      className="fas fa-times"
                    ></i>
                    {/* <input
                      style={{ width: "30px", borderStyle: "none" }}
                      type="number"
                    /> */}
                  </div>

                  <div
                    style={{
                      width: "50%",
                      marginLeft: "30px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "#999",
                      minWidth: "200px",
                    }}
                    className="tracking_meal_info_label"
                  >
                    {e.foodName} ({e.foodServing * 100}g)
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "17px",
                      fontWeight: "500",
                      marginRight: "10px",
                    }}
                    className="tracking_meal_info_value w-50"
                  >
                    {Math.trunc(e.foodKCAL * e.foodServing)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }

  return <div className="tracking_sidebar_container">{body}</div>;
}

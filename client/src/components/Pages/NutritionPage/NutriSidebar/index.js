import { Button, Col, Collapse, Divider, Row, Statistic, Tooltip } from "antd";
import { Spinner } from "react-bootstrap";
import {
  calculateFoodTotalKCAL,
  calculateTotalCaloriesNeeded,
} from "../../../../utils/calculate";
import "./style.scss";

const { Panel } = Collapse;

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
  } else if (!authLoading && isAuthenticated) {
    if (!userInfo.trackingInfo) {
      body = (
        <div className="position-absolute top-50 start-50 translate-middle px-3 mt-4">
          <Tooltip
            placement="right"
            title={
              "Setup your diet by providing your current body condition and your goal"
            }
          >
            <Button
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleShowTrackingModal}
              icon={
                <ion-icon
                  style={{ fontSize: "3rem", marginRight: 5 }}
                  name="settings-outline"
                ></ion-icon>
              }
              type="link"
            >
              Diet Tracking
            </Button>
          </Tooltip>
        </div>
      );
    } else {
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
        <div>
          {/*TODO: what is this, Hoang??*/}
          <div className="tracking_sidebar_header">
            {/*<div className="tracking_sidebar_label">Calories Remaining</div>*/}
            <i
              onClick={handleShowTrackingModal}
              className="fas fa-ellipsis-v"
            ></i>
          </div>

          <div className="position-absolute bottom-0 start-50 translate-middle px-3 mt-4">
            <Tooltip
              placement="top"
              title={
                "Setup your diet by providing your current body condition and your goal"
              }
            >
              <Button
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleShowTrackingModal}
                icon={
                  <ion-icon
                    style={{ fontSize: "1.8rem", marginRight: 5 }}
                    name="settings-outline"
                  ></ion-icon>
                }
                type="link"
              >
                Add Tracking
              </Button>
            </Tooltip>
          </div>

          <div className="p-4">
            <Row gutter={10}>
              <Col span={6}>
                <Statistic
                  title="Goal 🎯"
                  value={caloriesGoal}
                  valueStyle={{
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Food 🍔"
                  value={caloriesFood}
                  valueStyle={{ color: "#afec7a", fontSize: "2rem" }}
                  prefix={<i className="fas fa-arrow-up"></i>}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Exercise 🏃"
                  value={todayCaloriesWorkout}
                  valueStyle={{ color: "#f87f88", fontSize: "2rem" }}
                  prefix={<i className="fas fa-arrow-down"></i>}
                />
              </Col>
              <Col span={6}>
                <Tooltip
                  title={
                    caloriesRemaining > 0
                      ? "Your diet is going very well. Keep going !"
                      : "Warning !!! You have passed over your daily intake"
                  }
                  color={caloriesRemaining > 0 ? "green" : "red"}
                  placement="right"
                >
                  <Statistic
                    title="Remaining 🍽"
                    value={caloriesRemaining}
                    valueStyle={{
                      fontSize: "2rem",
                      color: caloriesRemaining > 0 ? "#02bb02" : "#cf1322",
                    }}
                    suffix={
                      caloriesRemaining > 0 ? (
                        <i className="far fa-arrow-alt-circle-up"></i>
                      ) : (
                        <i className="far fa-arrow-alt-circle-down"></i>
                      )
                    }
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>

          <Divider></Divider>
          <Collapse
            defaultActiveKey={["1"]}
            bordered={false}
            ghost
            expandIcon={({ isActive }) => (
              <div style={{ fontSize: 20 }}>
                {!isActive ? (
                  <i className="fas fa-chevron-circle-right"></i>
                ) : (
                  <i className="fas fa-chevron-circle-down"></i>
                )}
              </div>
            )}
          >
            <Panel
              header={
                <h1>
                  Daily Menu <i className="fas fa-utensils"></i>
                </h1>
              }
              key="1"
            >
              {!todayListFoods?.listFoods?.length ? (
                <div
                  className="d-flex flex-column align-items-center w-100 mt-5"
                  style={{ opacity: 0.2 }}
                >
                  <i
                    className="fas fa-utensils mb-3"
                    style={{ fontSize: 50 }}
                  ></i>
                  <h1>No dishes added to today menu</h1>
                </div>
              ) : (
                <Collapse defaultActiveKey={["1"]} ghost>
                  <Panel
                    style={{ fontSize: "1.8rem" }}
                    header="Breakfast 🍞"
                    key="1"
                  >
                    {todayListFoods?.listFoods?.find(
                      (item) => item.mealType === 0
                    ) ? (
                      todayListFoods?.listFoods
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
                        ))
                    ) : (
                      <div
                        className="d-flex flex-column align-items-center w-100"
                        style={{ opacity: 0.2 }}
                      >
                        <i
                          className="fas fa-utensils"
                          style={{ fontSize: 24 }}
                        ></i>
                        <h4>No dishes</h4>
                      </div>
                    )}
                  </Panel>
                  <Panel
                    style={{ fontSize: "1.8rem" }}
                    header="Lunch 🍱"
                    key="2"
                  >
                    {todayListFoods?.listFoods?.find(
                      (item) => item.mealType === 1
                    ) ? (
                      todayListFoods?.listFoods
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
                                  handleRemoveTrackingFood(
                                    e.id,
                                    e.foodServing,
                                    1
                                  )
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
                        ))
                    ) : (
                      <div
                        className="d-flex flex-column align-items-center w-100"
                        style={{ opacity: 0.2 }}
                      >
                        <i
                          className="fas fa-utensils"
                          style={{ fontSize: 24 }}
                        ></i>
                        <h4>No dishes</h4>
                      </div>
                    )}
                  </Panel>
                  <Panel
                    style={{ fontSize: "1.8rem" }}
                    header="Snacks 🍟"
                    key="3"
                  >
                    {todayListFoods?.listFoods?.find(
                      (item) => item.mealType === 2
                    ) ? (
                      todayListFoods?.listFoods
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
                                  handleRemoveTrackingFood(
                                    e.id,
                                    e.foodServing,
                                    2
                                  )
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
                        ))
                    ) : (
                      <div
                        className="d-flex flex-column align-items-center w-100"
                        style={{ opacity: 0.2 }}
                      >
                        <i
                          className="fas fa-utensils"
                          style={{ fontSize: 24 }}
                        ></i>
                        <h4>No dishes</h4>
                      </div>
                    )}
                  </Panel>
                  <Panel
                    style={{ fontSize: "1.8rem" }}
                    header="Dinner 🍜"
                    key="4"
                  >
                    {todayListFoods?.listFoods?.find(
                      (item) => item.mealType === 3
                    ) ? (
                      todayListFoods?.listFoods
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
                                  handleRemoveTrackingFood(
                                    e.id,
                                    e.foodServing,
                                    3
                                  )
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
                        ))
                    ) : (
                      <div
                        className="d-flex flex-column align-items-center w-100"
                        style={{ opacity: 0.2 }}
                      >
                        <i
                          className="fas fa-utensils"
                          style={{ fontSize: 24 }}
                        ></i>
                        <h4>No dishes</h4>
                      </div>
                    )}
                  </Panel>
                </Collapse>
              )}
            </Panel>
          </Collapse>
        </div>
      );
    }
  }

  return (
    <div className="tracking_sidebar_container position-relative p-4">
      {body}
    </div>
  );
}

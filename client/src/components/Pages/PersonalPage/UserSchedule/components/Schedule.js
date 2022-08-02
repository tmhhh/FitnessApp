import { Tabs, Tag, Typography } from "antd";
import { convertStringToKCAL } from "utils/formatCurrency";
const { TabPane } = Tabs;
const { Title } = Typography;
function Schedule({
  onClickExercise,
  date,
  days,
  onRemoveFromTrainingSchedule,
  workoutSchedule,
  trackingInfo,
}) {
  const goalTagColor = "#87d068";
  const badTagColor = "#f50";
  const goodTagColor = "#2db7f5";
  return (
    <div
      className={`schedule__item ${
        date.toLocaleDateString() === new Date().toLocaleDateString() &&
        " same-date"
      }`}
    >
      <div className={"schedule__item-top "}>{days[date.getDay()]}</div>
      <div className={`schedule__item-body`}>{date.getDate()}</div>
      <div className="schedule__item-bottom">
        <Tabs defaultActiveKey="2">
          <TabPane tab="Training" key="1">
            {workoutSchedule.find(
              (item) => item.createdDate === date.toLocaleDateString()
            ) ? (
              workoutSchedule
                .filter(
                  (schedule) =>
                    schedule.createdDate === date.toLocaleDateString()
                )
                .map((workout, index) => (
                  <div
                    key={index}
                    onClick={() => onClickExercise(workout.exercise._id)}
                    className="schedule__item__task"
                  >
                    <p className="schedule__item__task-title">
                      {workout.exercise?.name}
                    </p>

                    {workout.exercise?.muscleActivate.map((muscle, index) =>
                      index < workout.exercise.muscleActivate.length - 1 ? (
                        <span key={index} className="schedule__item__task-time">
                          {muscle} -
                        </span>
                      ) : (
                        <span key={index} className="schedule__item__task-time">
                          {muscle}
                          <i
                            onClick={(event) =>
                              onRemoveFromTrainingSchedule(
                                event,
                                workout.exercise._id,
                                date.toLocaleDateString()
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
              <></>
            )}
          </TabPane>
          <TabPane tab="Diet" key="2">
            <Title level={5}>Goal:</Title>
            <Tag color={goalTagColor}>
              {trackingInfo.trackingFood.find(
                (item) => item.addedDate === date.toLocaleDateString()
              )
                ? convertStringToKCAL(
                    trackingInfo.trackingFood.find(
                      (item) => item.addedDate === date.toLocaleDateString()
                    ).goalKCAL
                  )
                : null}
            </Tag>
            <Title level={5}>Achievement:</Title>
            {trackingInfo.trackingFood.find(
              (item) => item.addedDate === date.toLocaleDateString()
            ) ? (
              <Tag color={goodTagColor}>
                {convertStringToKCAL(
                  Math.trunc(
                    trackingInfo.trackingFood
                      .find(
                        (item) => item.addedDate === date.toLocaleDateString()
                      )
                      .listFoods.reduce(
                        (prev, current) =>
                          +prev + current.foodKCAL * +current.foodServing,
                        0
                      )
                  )
                )}
              </Tag>
            ) : (
              <></>
            )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Schedule;

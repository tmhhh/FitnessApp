import { DatePicker } from "antd";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
export default function TrainingModal(props) {
  const { show, handleClose, onOk, handleShowDatePicker, showDatePicker } =
    props;
  const { selectedExercise, isShow } = show;
  const embeddedLink = `https://www.youtube.com/embed/${
    selectedExercise.videoURL?.split("?v=")[1]
  }?autoplay=1`;
  return (
    <>
      <Modal
        className="training__modal-container"
        centered
        show={isShow}
        onHide={handleClose}
        size="lg"
      >
        <i onClick={handleClose} className="fas fa-times close-button"></i>
        <div className="training__modal-video">
          <iframe
            title="title"
            src={embeddedLink}
            allowfullscreen="true"
            allow="autoplay"
          ></iframe>
        </div>
        <div className="training__modal-description">
          <div className="exercise-name">{selectedExercise.name}</div>
          <div className="exercise-category">
            {selectedExercise.category} ({selectedExercise.calories}kcal{" "}
            <i class="fas fa-fire"></i> / 4 sets)
          </div>
          <div className="exercise-description">
            {selectedExercise.description}
          </div>
          <div className="exercise-muscles">
            {selectedExercise.muscleActivate?.map((e) => (
              <div className="exercise-muscle ">#{e}</div>
            ))}
          </div>
          {showDatePicker ? (
            <DatePicker
              showTime={{ format: "HH:mm" }}
              onOk={onOk}
              disabledDate={(current) => current < new Date()}
            />
          ) : (
            <button
              onClick={handleShowDatePicker}
              className="common-outline-button"
            >
              <i
                style={{ padding: "0 10px" }}
                className="far fa-calendar-plus"
              ></i>{" "}
              Add to schedule
            </button>
          )}
        </div>
      </Modal>

      {/* <DatePickerModal {...props} /> */}
    </>
  );
}

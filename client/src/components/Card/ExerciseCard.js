import "./style.scss";
export default function ExerciseCard({
  info: { img, title, muscleTags },
  handleShowModal,
}) {
  const handleOnClick = () => {
    console.log(img);
  };
  return (
    <>
      <div className="exercise_card" onClick={handleOnClick}>
        <img
          className="exercise_card_image"
          variant="top"
          src={img}
          alt={title}
        />
        <div className="exercise_card_body">
          <div onClick={handleShowModal} className="exercise_card_info">
            <i className="play-btn far fa-play-circle"></i>
            <div className="exercise_card_name">{title}</div>
          </div>
          <div className="exercise_card_tags">
            {muscleTags.map((e) => (
              <div style={{ marginRight: "1rem" }}>#{e}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

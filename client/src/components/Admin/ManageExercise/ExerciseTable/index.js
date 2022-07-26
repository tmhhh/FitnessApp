import { Table } from "react-bootstrap";
export default function CateTable({
  listExercises,
  updateModalShow,
  deleteOnClick,
}) {
  return (
    <>
      <Table
        responsive
        striped
        bordered
        hover
        className="text-center align-middle"
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Muscle Activate</th>
            <th>Thumbnail</th>
            <th>Video Link</th>
            <th>Edit/Remove</th>
          </tr>
        </thead>
        <tbody>
          {listExercises.map((exercise, index) => (
            <tr key={exercise._id}>
              <td>{index + 1}</td>
              <td>{exercise.name}</td>
              <td>{exercise.category}</td>
              <td>
                {exercise.muscleActivate.map((muscle, index) => {
                  if (index < exercise.muscleActivate.length - 1)
                    return muscle + ", ";
                  return muscle;
                })}
              </td>
              <td>{exercise.thumbnail}</td>
              <td>{exercise.videoURL}</td>
              <td>
                <ion-icon
                  style={{
                    fontSize: "20px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  name="settings-outline"
                  onClick={() => updateModalShow("update", exercise._id)}
                ></ion-icon>
                <ion-icon
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  name="trash-bin-outline"
                  onClick={() => deleteOnClick(exercise._id)}
                ></ion-icon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

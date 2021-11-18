import { Button, Table } from "react-bootstrap";
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
                <Button
                  variant="warning"
                  className="myButton"
                  exercise
                  ID={exercise._id}
                  onClick={() => updateModalShow("update", exercise._id)}
                >
                  🛠
                </Button>
                <Button
                  variant="danger"
                  className="myButton ms-2"
                  onClick={() => deleteOnClick(exercise._id)}
                >
                  🗑
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

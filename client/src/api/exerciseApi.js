import { BASE_API_URL } from "../assets/constants";
import axiosClient from "./axiosClient";
const exerciseApi = {
  getAllExercises: () => {
    return axiosClient.get(BASE_API_URL + "/exercise", {});
  },
  addExercise: (exercise) => {
    return axiosClient.post(BASE_API_URL + "/exercise/add", exercise);
  },
  editExercise: (id, exercise) => {
    return axiosClient.put(BASE_API_URL + `/exercise/update`, exercise);
  },
  deleteExercise: (id) => {
    return axiosClient.delete(BASE_API_URL + `/exercise/delete`, {
      data: {
        id,
      },
    });
  },
};
export default exerciseApi;

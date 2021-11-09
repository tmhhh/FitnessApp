import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exerciseApi from "../../api/exerciseApi";
export const addExercise = createAsyncThunk(
  "exercise/addExercise",
  async (exercise, thunkApi) => {
    try {
      const res = await exerciseApi.addExercise(exercise);
      if (res.data.isSuccess) return res.data.addedExercise;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllExercise =
  ("exercise/getAll",
  async () => {
    try {
      const res = await exerciseApi.getAllExercises();
      if (res.data.isSuccess) return res.data.listExercises;
    } catch (error) {
      console.log(error);
    }
  });

export const updateExercise =
  ("exercise/update",
  async (updateExercise) => {
    try {
      const res = await exerciseApi.editExercise(updateExercise);
      if (res.data.isSuccess) return res.data.updatedExercise;
    } catch (error) {
      console.log(error);
    }
  });
export const deleteExercise =
  ("exercise/delete",
  async (id) => {
    try {
      const res = await exerciseApi.deleteExercise(id);
      if (res.data.isSuccess) return res.data.deletedID;
    } catch (error) {
      console.log(error);
    }
  });
const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    exerciseLoading: true,
    listExercises: [],
  },
  extraReducers: {
    [getAllExercise.fulfilled]: (state, action) => {
      const { payload } = action;
      return { exerciseLoading: false, listExercises: payload.listExercises };
    },
    [addExercise.fulfilled]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listExercises: [...state.listExercises, payload.addedExercise],
      };
    },
    [updateExercise.fulfilled]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listExercises: state.listExercises.map((e) => {
          if (e._id.toString() === payload.updatedExercise._id.toString())
            return payload.updatedExercise;
          return e;
        }),
      };
    },
    [deleteExercise.fulfilled]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listExercises: state.listExercises.filter(
          (e) => e._id.toString() !== payload._id.toString()
        ),
      };
    },
  },
});

export default exerciseSlice;

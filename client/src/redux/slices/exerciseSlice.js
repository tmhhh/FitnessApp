import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exerciseApi from "../../api/exerciseApi";
export const addExercise = createAsyncThunk(
  "exercise/addExercise",
  async (exercise, thunkApi) => {
    try {
      const res = await exerciseApi.addExercise(exercise);
      console.log(res.data);
      if (res.data.isSuccess) return res.data.addedExercise;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllExercise = createAsyncThunk("exercise/getAll", async () => {
  try {
    const res = await exerciseApi.getAllExercises();
    console.log(res.data);
    if (res.data.isSuccess) return res.data.listExercises;
  } catch (error) {
    console.log(error);
  }
});

export const updateExercise = createAsyncThunk(
  "exercise/update",
  async (updateExercise) => {
    try {
      const res = await exerciseApi.editExercise(updateExercise);
      if (res.data.isSuccess) return res.data.updatedExercise;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteExercise = createAsyncThunk(
  "exercise/delete",
  async (id) => {
    try {
      const res = await exerciseApi.deleteExercise(id);
      console.log(res.data);
      if (res.data.isSuccess) return res.data.deletedID;
    } catch (error) {
      console.log(error);
    }
  }
);
const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    exerciseLoading: true,
    listExercises: [],
  },
  extraReducers: {
    [getAllExercise.fulfilled]: (state, action) => {
      const { payload } = action;
      return { exerciseLoading: false, listExercises: payload };
    },
    [addExercise.fulfilled]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listExercises: [...state.listExercises, payload],
      };
    },
    [updateExercise.fulfilled]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listExercises: state.listExercises.map((e) => {
          if (e._id.toString() === payload._id.toString()) return payload;
          return e;
        }),
      };
    },
    [deleteExercise.fulfilled]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listExercises: state.listExercises.filter(
          (e) => e._id.toString() !== payload.toString()
        ),
      };
    },
  },
});

export default exerciseSlice;

import { createSlice } from "@reduxjs/toolkit";
// createThunkAsync
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authLoading: true,
    isAuthenticated: false,
    userInfo: {},
  },
  reducers: {
    setAuth: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        authLoading: payload.authLoading,
        isAuthenticated: payload.isAuthenticated,
        userInfo: payload.userInfo,
      };
    },
    setAuthFailed: (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        userInfo: {},
        authLoading: false,
      };
    },
    setUserAvatar: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          userImage: payload,
        },
      };
    },
    setUserProfile: (state, action) => {
      const { payload } = action;
      return { ...state, userInfo: { ...payload } };
    },
    addFavoriteProduct: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          favoriteProducts: [
            ...state.userInfo.favoriteProducts,
            payload.addedFavorite,
          ],
        },
      };
    },
    removeFavoriteProduct: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          favoriteProducts: [
            ...state.userInfo.favoriteProducts.filter(
              (e) => e.toString() !== payload.removedFavorite.toString()
            ),
          ],
        },
      };
    },
    addToWorkoutSchedule: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        userInfo: { ...state.userInfo, workoutSchedule: payload.addedExercise },
      };
    },
    removeFromWorkoutSchedule: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          workoutSchedule: [
            ...state.userInfo.workoutSchedule.filter(
              (e) =>
                e.exercise._id.toString() !==
                  payload.removedExercise.toString() ||
                (e.exercise._id.toString() ===
                  payload.removedExercise.toString() &&
                  e.createdDate !== payload.createdDate)
            ),
          ],
        },
      };
    },
  },
});

// const {reducer:authReducer,action:authAction} = authSlice;

export default authSlice;

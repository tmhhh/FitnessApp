export const getTodayWorkoutCalories = (state) =>
  state.authReducer.userInfo?.workoutSchedule
    ?.filter((item) => item.createdDate === new Date().toLocaleDateString())
    .reduce((prev, current) => prev + 50, 0);

export default function NutritionReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_NUTRI":
      return {
        isLoading: payload.isLoading,
        listFoods: payload.listFoods,
      };
    case "SET_NUTRI_FAIL":
      return {
        isLoading: false,
        listFoods: [],
      };
    default:
      return state;
  }
}

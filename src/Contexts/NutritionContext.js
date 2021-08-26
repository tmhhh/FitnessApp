import axios from "axios";
import React, { useReducer } from "react";
import { NUTRI_API_CONFIG } from "../assets/constants";
import NutritionReducer from "../Components/Reducers/NutritionReducer";
export const NutritionContext = React.createContext();
export default function NutritionContextProvider({ children }) {
  const [nutriState, dispatch] = useReducer(NutritionReducer, {
    listFood: [],
    isLoading: false,
  });
  const nutriSearching = async (foodName) => {
    try {
      dispatch({
        type: "SET_NUTRI",
        payload: { isLoading: true, listFoods: {} },
      });
      const res = await axios.request(NUTRI_API_CONFIG(foodName));
      console.log(res);
      dispatch({
        type: "SET_NUTRI",
        payload: { isLoading: false, listFoods: res.data.hints },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_NUTRI_FAIL", payload: {} });
    }
  };
  const contextData = { nutriSearching, nutriState };
  return (
    <NutritionContext.Provider value={contextData}>
      {children}
    </NutritionContext.Provider>
  );
}

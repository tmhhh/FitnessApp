import InputField from "components/Common/InputField";
import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getTodayWorkoutCalories } from "redux/selectors/exerciseSelector";
import userApi from "../../../api/userApi";
import { BASE_IMAGE_BASE_URL } from "../../../assets/constants";
import nutritionLottie from "../../../assets/lottie/salad-diet.json";
import { Context } from "../../../contexts";
import authSlice from "../../../redux/slices/authSlice";
import NoResults from "../../Common/Placeholders/NoResults";
import SearchBar from "../../Common/SearchBar";
import NutritionContainer from "../../Containers/NutritionContainer";
import FoodModal from "./FoodModal";
import TrackingSidebar from "./NutriSidebar";
import "./style.scss";
import TrackingModal from "./TrackingModal";

export default function NutritionPage() {
  const dispatch = useDispatch();
  const { nutriState } = useContext(Context);
  const { userInfo, isAuthenticated, authLoading } = useSelector(
    (state) => state.authReducer
  );
  const todayCaloriesWorkout = useSelector(getTodayWorkoutCalories);
  const [modal, setModal] = useState({
    isShown: false,
    foodData: {},
  });
  const listInputFieldsStep1 = [
    {
      group: "Overall",
      data: [
        {
          name: "userHeight",
          label: "Height (inch)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userWeight",
          label: "Weight (lb)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userAge",
          label: "Age",
          component: () => InputField,
          required: true,
        },
      ],
    },
    {
      group: "Upper Body",
      data: [
        {
          name: "userNeck",
          label: "Neck (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userBiceps",
          label: "Biceps (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userChest",
          label: "Chest (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userForearm",
          label: "Forearm (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userAbdomen",
          label: "Abdomen (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userWrist",
          label: "Wrist (cm)",
          component: () => InputField,
          required: true,
        },
      ],
    },
    {
      group: "Lower Body",
      data: [
        {
          name: "userHip",
          label: "Hip",
          component: () => InputField,
        },

        {
          name: "userThigh",
          label: "Thigh (cm)",
          component: () => InputField,
        },

        {
          name: "userKnee",
          label: "Knee (cm)",
          component: () => InputField,
        },

        {
          name: "userAnkle",
          label: "Ankle (cm)",
          component: () => InputField,
        },
      ],
    },
  ];
  //
  const [servingSize, setServingSize] = useState(1);

  //TRACKING MODAL
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const handleCloseTrackingModal = () => setShowTrackingModal(false);
  const handleShowTrackingModal = () => setShowTrackingModal(true);

  //
  const handleServingChange = (e) => {
    setServingSize(e.target.value);
  };
  //HANDLE FOOD DETAIL MODAL
  const handleCloseModal = (action) => {
    if (action !== "next") setServingSize(1);
    setModal({ ...modal, isShown: false });
  };
  const handleShowModal = (foodID) => {
    const foundFood = nutriState.listFoods.find(
      (e) => e.food.foodId === foodID
    );
    setModal({
      foodData: foundFood,
      isShown: true,
    });
  };

  //HANDLE REMOVE TRACKING FOOD
  const handleRemoveTrackingFood = async (id) => {
    try {
      const res = await userApi.removeTrackingFood(id);
      if (res.data.isSuccess)
        return dispatch(
          authSlice.actions.setAuth({
            authLoading: false,
            isAuthenticated: true,
            userInfo: res.data.updatedUser,
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  //
  useEffect(() => {
    if (!authLoading && isAuthenticated && !userInfo.trackingInfo.isFilled) {
      handleShowTrackingModal();
    }
  }, [userInfo]);
  return (
    <>
      <NutritionContainer>
        <Helmet>
          <title>Nutrition</title>
          <meta name="description" content="Word of nutrition" />
        </Helmet>
        <TrackingSidebar
          todayCaloriesWorkout={todayCaloriesWorkout}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          userInfo={userInfo}
          handleShowTrackingModal={handleShowTrackingModal}
          handleRemoveTrackingFood={handleRemoveTrackingFood}
        />
        <div className="nutrition_section ">
          <SearchBar />
          {nutriState.isLoading ? (
            <Lottie
              style={{
                height: "300px",
                width: "300px",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
              animationData={nutritionLottie}
            />
          ) : nutriState.listFoods ? (
            nutriState.listFoods.length <= 0 ? (
              <NoResults />
            ) : (
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Serving</th>
                      <th>Food</th>
                      <th>Energy</th>
                      <th>Nutrients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutriState.listFoods.map((e, index) => (
                      <tr
                        key={index}
                        role="button"
                        onClick={() => handleShowModal(e.food.foodId)}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <img
                            height="80"
                            width="80"
                            src={
                              e.food.image
                                ? e.food.image
                                : BASE_IMAGE_BASE_URL + "/dishes-default.png"
                            }
                            alt={e.food.label}
                          />
                        </td>
                        <td>100gr</td>
                        <td>{e.food.label}</td>
                        <td> {Math.trunc(e.food.nutrients.ENERC_KCAL)}</td>
                        <td>
                          <div className="d-flex flex-column align-items-start pl-4 justify-content-start">
                            <p>
                              Protein: {Math.trunc(e.food.nutrients.PROCNT)}g
                            </p>
                            <p>Fat: {Math.trunc(e.food.nutrients.FAT)}g</p>
                            <p>Carbs: {Math.trunc(e.food.nutrients.FIBTG)}g</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )
          ) : (
            <div className="none_active"></div>
          )}
          <FoodModal
            handleServingChange={handleServingChange}
            servingSize={servingSize}
            modal={modal}
            handleCloseModal={handleCloseModal}
          />
          <TrackingModal
            showTrackingModal={showTrackingModal}
            handleCloseTrackingModal={handleCloseTrackingModal}
            listInputFieldsStep1={listInputFieldsStep1}
          />
        </div>
      </NutritionContainer>
    </>
  );
}

import { Radio } from "antd";
import InputField from "components/Common/InputField";
import { useContext, useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getTodayWorkoutCalories } from "redux/selectors/exerciseSelector";
import userApi from "../../../api/userApi";
import { BASE_IMAGE_BASE_URL } from "../../../assets/constants";
import { Context } from "../../../contexts";
import authSlice from "../../../redux/slices/authSlice";
import CustomLoading from "../../Common/Placeholders/CustomLoading";
import NoResults from "../../Common/Placeholders/NoResults";
import SearchBar from "../../Common/SearchBar";
import NutritionContainer from "../../Containers/NutritionContainer";
import { FilterModal } from "./FilterModal";
import FoodModal from "./FoodModal";
import TrackingSidebar from "./NutriSidebar";
import "./style.scss";
import TrackingModal from "./TrackingModal";
export default function NutritionPage() {
  const [searchType, setSearchType] = useState("food");

  const searchBarRef = useRef(null);
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

  useEffect(() => {
    if (foodName) {
      searchBarRef.current.searchNutrition();
    }
  }, [searchType]);

  /**
   * FILTER MODAL
   */
  const [filterModal, setFilterModal] = useState({
    isShown: false,
    isLoading: false,
  });
  const handleShowFilterModal = () => {
    setFilterModal({
      ...filterModal,
      isShown: true,
    });
  };
  const handleCloseFilterModal = () => {
    setFilterModal({
      ...filterModal,
      isShown: false,
    });
  };

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
  const handleShowModal = (index) => {
    setModal({
      foodData: nutriState.listFoods[index],
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

  /**
   * Handle Save Filter
   */
  const handleSaveFilter = (values) => {
    nutriSearching(
      {
        health: values.health?.value,
        category: values.category?.value,
        calories: `${values.calories[0]}-${values.calories[1]}`,
        diet: values.diet?.value,
        cuisineType: values.cuisineType?.value,
        foodName,
      },
      searchType
    );
  };

  /**
   * Handle view dishes from ingredient
   */
  const handleOnViewDishClick = (ingredient) => {
    setFoodName(ingredient);
    setSearchType("dish");

    handleCloseModal("close");
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
        <div className="nutrition_section">
          <SearchBar searchType={searchType} ref={searchBarRef} />
          <div className="d-flex justify-content-center align-items-center">
            <h3 style={{ color: "#a8a8a8" }}>Search by: </h3>
            <Radio.Group
              className="ms-3"
              defaultValue="food"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="food">Ingredients</Radio.Button>
              <Radio.Button value="dish">Dishes</Radio.Button>
            </Radio.Group>
          </div>
          {nutriState.isLoading ? (
            <CustomLoading />
          ) : nutriState.listFoods ? (
            nutriState.listFoods.length <= 0 ? (
              <NoResults />
            ) : (
              <>
                <div className="d-flex justify-content-start">
                  <button
                    className="common-outline-button common-outline-button-blue mb-3"
                    style={{ fontSize: "14px" }}
                    onClick={handleShowFilterModal}
                  >
                    <i className="fas fa-filter"></i> Filter
                  </button>
                </div>
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
                    {nutriState.listFoods.map((e, index) => {
                      const item = e.recipe || e.food;
                      const nutrients = item.totalNutrients || item.nutrients;
                      return (
                        <tr
                          key={index}
                          role="button"
                          onClick={() => handleShowModal(index)}
                        >
                          <td>{index + 1}</td>
                          <td>
                            <img
                              height="80"
                              width="80"
                              src={
                                item.image
                                  ? item.image
                                  : BASE_IMAGE_BASE_URL + "/dishes-default.png"
                              }
                              alt={item.label}
                            />
                          </td>
                          <td>{"100g"}</td>
                          <td>{item.label}</td>
                          <td>
                            {Math.trunc(
                              (nutrients.ENERC_KCAL?.quantity * 100) /
                                item.totalWeight || nutrients.ENERC_KCAL
                            )}
                          </td>
                          <td>
                            <div className="d-flex flex-column align-items-start pl-4 justify-content-start">
                              <p>
                                Protein:{" "}
                                {Math.trunc(
                                  (nutrients.PROCNT?.quantity * 100) /
                                    item.totalWeight || nutrients.PROCNT
                                )}
                                g
                              </p>
                              <p>
                                Fat:{" "}
                                {Math.trunc(
                                  (nutrients.FAT?.quantity * 100) /
                                    item.totalWeight || nutrients.FAT
                                )}
                                g
                              </p>
                              <p>
                                Carbs:{" "}
                                {Math.trunc(
                                  (nutrients.FIBTG?.quantity * 100) /
                                    item.totalWeight || nutrients.FIBTG
                                )}
                                g
                              </p>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
            handleOnViewDishClick={handleOnViewDishClick}
          />
          <TrackingModal
            showTrackingModal={showTrackingModal}
            handleCloseTrackingModal={handleCloseTrackingModal}
            listInputFieldsStep1={listInputFieldsStep1}
          />
          <FilterModal
            visible={filterModal.isShown}
            handleCancel={handleCloseFilterModal}
            handleSaveFilter={handleSaveFilter}
            searchType={searchType}
          />
        </div>
      </NutritionContainer>
    </>
  );
}

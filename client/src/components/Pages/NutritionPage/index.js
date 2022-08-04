import { Badge, Image, Segmented, Table, Typography } from "antd";
import Lottie from "lottie-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getTodayWorkoutCalories } from "redux/selectors/exerciseSelector";
import userApi from "../../../api/userApi";
import dishesPlaceholder from "../../../assets/img/dishes-default.png";
import nutritionLottie from "../../../assets/lottie/salad-diet.json";
import { Context } from "../../../contexts";
import authSlice from "../../../redux/slices/authSlice";
import NoResults from "../../Common/Placeholders/NoResults";
import SearchBar from "../../Common/SearchBar";
import NutritionContainer from "../../Containers/NutritionContainer";
import { FilterModal } from "./FilterModal";
import FoodModal from "./FoodModal";
import TrackingSidebar from "./NutriSidebar";
import "./style.scss";
import TrackingModal from "./TrackingModal";
const { Column } = Table;
const { Text } = Typography;
export default function NutritionPage() {
  const [searchType, setSearchType] = useState("food");

  const searchBarRef = useRef(null);
  const dispatch = useDispatch();
  const { nutriState, nutriSearching, foodName, setFoodName, setFilter } =
    useContext(Context);
  const { userInfo, isAuthenticated, authLoading } = useSelector(
    (state) => state.authReducer
  );
  const todayCaloriesWorkout = useSelector(getTodayWorkoutCalories);
  const [modal, setModal] = useState({
    isShown: false,
    foodData: {},
  });
  const data = useMemo(() => {
    return nutriState?.listFoods?.map((e, index) => {
      const item = e.recipe || e.food;
      const nutrients = item.totalNutrients || item.nutrients;
      return {
        key: index.toString(),
        info: {
          name: item.label,
          image: item.image ? item.image : dishesPlaceholder,
        },
        label: item.label,
        energy:
          Math.trunc(
            (nutrients.ENERC_KCAL?.quantity * 100) / item.totalWeight ||
              nutrients.ENERC_KCAL
          ) || 0,
        protein:
          Math.trunc(
            (nutrients.PROCNT?.quantity * 100) / item.totalWeight ||
              nutrients.PROCNT
          ) || 0,
        fat:
          Math.trunc(
            (nutrients.FAT?.quantity * 100) / item.totalWeight || nutrients.FAT
          ) || 0,
        carbs:
          Math.trunc(
            (nutrients.FIBTG?.quantity * 100) / item.totalWeight ||
              nutrients.FIBTG
          ) || 0,
      };
    });
  }, [nutriState.listFoods]);
  //
  const [servingSize, setServingSize] = useState(1);

  useEffect(() => {
    if (foodName) {
      searchBarRef.current.searchNutrition();
      searchBarRef.current.setInput(foodName);
    }
  }, [searchType, foodName]);

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
    setServingSize(e);
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
    const filter = {
      health: values.health?.value,
      category: values.category?.value,
      dishCalories: searchType === 'dish' ? `${values.calories[0]}-${values.calories[1]}` : null,
      ingrCalories: searchType === 'dish' ? null :`${values.calories[0]}-${values.calories[1]}`,
      diet: values.diet?.value,
      cuisineType: values.cuisineType?.value,
    };

    setFilter(filter);

    if (foodName) {
      nutriSearching(
        {
          ...filter,
          foodName,
        },
        searchType
      );
    }
  };

  const handleClearFilter = () => {
    setFilter(null);
  }

  /**
   * Handle view dishes from ingredient
   */
  const handleOnViewDishClick = (ingredient) => {
    setFoodName(ingredient);
    setSearchType("dish");

    handleCloseModal("close");
  };

  //
  // useEffect(() => {
  //   if (!authLoading && isAuthenticated && !userInfo.trackingInfo.userH) {
  //     handleShowTrackingModal();
  //   }
  // }, [userInfo]);

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
        <div
          className="nutrition_section overflow-hidden p-5"
          style={{ backgroundColor: "#fcfcfc", height: 700 }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <h3 className="m-0" style={{ color: "#a8a8a8" }}>
              Search by:{" "}
            </h3>
            <Segmented
              className="ms-3"
              defaultValue="food"
              value={searchType}
              onChange={(value) => setSearchType(value)}
              disabled={nutriState.isLoading}
              options={[
                {
                  label: "Ingredients",
                  value: "food",
                },
                {
                  label: "Dishes",
                  value: "dish",
                },
              ]}
            />
          </div>

          <SearchBar searchType={searchType} ref={searchBarRef} />

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
              <div className="h-100">
                <div className="d-flex justify-content-start">
                  <button
                    className="common-outline-button common-outline-button-blue mb-3"
                    style={{ fontSize: "14px" }}
                    onClick={handleShowFilterModal}
                  >
                    <i className="fas fa-filter"></i> Filter
                  </button>
                </div>
                <div className="overflow-auto h-100 ">
                  <Table
                    pagination={false}
                    // rowSelection={}
                    style={{ cursor: "pointer", marginBottom: 200 }}
                    dataSource={data}
                    onRow={(_, rowIndex) => {
                      return {
                        onClick: () => {
                          handleShowModal(rowIndex);
                        },
                      };
                    }}
                  >
                    <Column
                      style={{ cursor: "pointer" }}
                      title="Name"
                      key="info"
                      dataIndex="info"
                      render={(info) => (
                        <div>
                          <Image
                            preview={false}
                            style={{
                              width: 80,
                              aspectRatio: 1,
                              borderRadius: 10,
                              marginRight: 15,
                            }}
                            src={info.image}
                          />
                          <Text strong>{info.name}</Text>
                        </div>
                      )}
                    />
                    <Column
                      title="Energy"
                      key="energy"
                      dataIndex="energy"
                      render={(value) => (
                        <Text strong>
                          {" "}
                          <Badge status="success" /> {value} kcal
                        </Text>
                      )}
                    />
                    <Column
                      title="Protein"
                      key="protein"
                      dataIndex="protein"
                      render={(value) => (
                        <Text strong>
                          {" "}
                          <Badge status="error" />
                          {value}g
                        </Text>
                      )}
                    />
                    <Column
                      title="Fat"
                      key="fat"
                      dataIndex="fat"
                      render={(value) => (
                        <Text strong>
                          {" "}
                          <Badge status="processing" />
                          {value}g
                        </Text>
                      )}
                    />
                    <Column
                      title="Carbs"
                      key="carbs"
                      dataIndex="carbs"
                      render={(value) => (
                        <Text strong>
                          {" "}
                          <Badge status="warning" />
                          {value}g
                        </Text>
                      )}
                    />
                  </Table>
                </div>
              </div>
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
            setShowTrackingModal={setShowTrackingModal}
          />
          <FilterModal
            visible={filterModal.isShown}
            handleCancel={handleCloseFilterModal}
            handleSaveFilter={handleSaveFilter}
            handleClearFilter={handleClearFilter}
            searchType={searchType}
          />
        </div>
      </NutritionContainer>
    </>
  );
}

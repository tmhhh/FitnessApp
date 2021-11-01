import { useContext, useState, useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import userApi from "../../../api/userApi";
import { BASE_IMAGE_BASE_URL } from "../../../assets/constants";
import { Context } from "../../../Contexts";
import SearchBar from "../../Common/SearchBar";
import NutritionContainer from "../../Containers/NutritionContainer";
import FoodModal from "./FoodModal";
import TrackingSidebar from "./NutriSidebar";
import "./style.scss";
import TrackingModal from "./TrackingModal";
import authSlice from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
export default function NutritionPage() {
  const dispatch = useDispatch();
  const { nutriState } = useContext(Context);
  const { userInfo, isAuthenticated, authLoading } = useSelector(
    (state) => state.authReducer
  );
  const [modal, setModal] = useState({
    isShown: false,
    foodData: {},
  });

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
    console.log({ foundFood });
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
      console.log(userInfo);
      handleShowTrackingModal();
    }
  }, [userInfo]);
  return (
    <>
      <NutritionContainer>
        <TrackingSidebar
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          userInfo={userInfo}
          handleShowTrackingModal={handleShowTrackingModal}
          handleRemoveTrackingFood={handleRemoveTrackingFood}
        />
        <div className="nutrition_section ">
          <SearchBar />
          {nutriState.isLoading ? (
            <Spinner
              style={{ position: "absolute", left: "50%", top: "50%" }}
              animation="border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : nutriState.listFoods ? (
            // nutriState.listFoods.length > 0 ? (
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
                          <p>Protein: {Math.trunc(e.food.nutrients.PROCNT)}g</p>
                          <p>Fat: {Math.trunc(e.food.nutrients.FAT)}g</p>
                          <p>Carbs: {Math.trunc(e.food.nutrients.FIBTG)}g</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            // ) : (
            //   <div className="nutrition_section_w ">
            //     <SearchBar />
            //   </div>
            // )
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
          />
        </div>
      </NutritionContainer>
    </>
  );
}

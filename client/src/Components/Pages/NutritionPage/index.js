import { Fragment, useContext, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Context } from "../../../Contexts";
import NutritionContainer from "../../Containers/NutritionContainer";
import SearchBar from "../../Common/SearchBar";
import "./style.scss";
import FoodModal from "./FoodModal";
import { BASE_IMAGE_BASE_URL } from "../../../assets/constants";
export default function NutritionPage() {
  const { nutriState } = useContext(Context);
  const [modal, setModal] = useState({
    isShown: false,
    foodData: {},
  });
  const [servingSize, setServingSize] = useState(1);

  const handleServingChange = (e) => {
    setServingSize(e.target.value);
  };
  //HANDLE MODAL
  const handleCloseModal = () => {
    setModal({ ...modal, isShown: false });
    setServingSize(1);
  };
  const handleShowModal = (foodID) => {
    console.log(foodID);
    const foundFood = nutriState.listFoods.find(
      (e) => e.food.foodId === foodID
    );
    console.log({ foundFood });
    setModal({
      foodData: foundFood,
      isShown: true,
    });
  };

  //HANDLE INVALID IMG
  const handleErrorImg = (e) => {
    e.target.onerror = null;
    // e.target.src = BASE_IMAGE_BASE_URL + "/dishes-default.jpg";
    e.target.src = "http://localhost:4000/img/base/dishes-default.jpg";
  };
  return (
    <>
      <NutritionContainer>
        {nutriState.isLoading ? (
          <div className="nutrition_section none_active">
            <SearchBar />
            <Spinner
              style={{ position: "absolute", left: "50%", top: "50%" }}
              animation="border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : nutriState.listFoods ? (
          nutriState.listFoods.length > 0 ? (
            <>
              <div className="nutrition_section">
                <SearchBar />
                <div className="header container">
                  <Row>
                    <Col lg={2} md={2}>
                      <div className="header_image">Image</div>
                    </Col>
                    <Col lg={2} md={2}>
                      <div className="header_serving">Serving</div>
                    </Col>
                    <Col lg={4} md={4}>
                      <div className="header_foodname">Food</div>
                    </Col>
                    <Col lg={2} md={2}>
                      <div className="header_totalEnergy">Energy</div>
                    </Col>
                    <Col lg={2} md={2}>
                      <div className="header_nutrient">Nutrients</div>
                    </Col>
                  </Row>
                </div>
                <div className="body container">
                  <Row>
                    {nutriState.listFoods.map((e, index) => (
                      <Fragment key={index}>
                        <Col lg={2} md={2}>
                          <div
                            onClick={() => {
                              handleShowModal(e.food.foodId);
                            }}
                            role="button"
                            className="food_image"
                          >
                            <img
                              // onError={handleErrorImg}
                              src={
                                e.food.image
                                  ? e.food.image
                                  : BASE_IMAGE_BASE_URL + "/dishes-default.png"
                              }
                              alt={e.food.label}
                            />
                          </div>{" "}
                        </Col>
                        <Col lg={2} md={2}>
                          <div className="food_serving">100 gram</div>
                        </Col>
                        <Col lg={4} md={4}>
                          <div className="food_name">{e.food.label}</div>
                        </Col>
                        <Col lg={2} md={2}>
                          <div className="food_energy">
                            {Math.trunc(e.food.nutrients.ENERC_KCAL)}
                          </div>
                        </Col>
                        <Col lg={2} md={2}>
                          <div className="food_nutrient">
                            <p>
                              Protein: {Math.trunc(e.food.nutrients.PROCNT)}g
                            </p>
                            <p>Fat: {Math.trunc(e.food.nutrients.FAT)}g</p>
                            <p>Carbs: {Math.trunc(e.food.nutrients.FIBTG)}g</p>
                          </div>
                        </Col>
                      </Fragment>
                    ))}
                  </Row>
                </div>
              </div>
            </>
          ) : (
            <div className="nutrition_section none_active">
              <SearchBar />
            </div>
          )
        ) : (
          <div className="nutrition_section none_active">
            <SearchBar />
          </div>
        )}
        <FoodModal
          handleServingChange={handleServingChange}
          servingSize={servingSize}
          modal={modal}
          handleCloseModal={handleCloseModal}
        />
      </NutritionContainer>
    </>
  );
}

import {
  Button,
  Dropdown,
  Image,
  InputNumber,
  Menu,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { colors } from "assets/color";
import { forwardRef, useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import userApi from "../../../../api/userApi";
import dishesPlaceholder from "../../../../assets/img/dishes-default.png";
import { Context } from "../../../../contexts";
import authSlice from "../../../../redux/slices/authSlice";
import { calculatePercentage } from "../../../../utils/calculate";
import messageAntd, { messageTypes } from "../../../Common/Toast/message";
import { filterNutrition } from "../constants";
import CaloriesChart from "./CaloriesChart";
import "./style.scss";
const { Text } = Typography;
const { TabPane } = Tabs;

const AddFoodButton = forwardRef(({ children, onClick, menu }, ref) => (
  <Dropdown
    overlayStyle={{ zIndex: 10000000 }}
    overlay={menu}
    trigger={["click"]}
  >
    <button
      style={{ padding: 10 }}
      type="button"
      className="common-button common-button-blue"
      ref={ref}
    >
      {children}
    </button>
  </Dropdown>
));

export default function FoodModal({
  handleCloseModal,
  modal: { isShown, foodData },
  setServingSize,
  servingSize,
  handleServingChange,
  goalKCAL,
  handleOnViewDishClick,
}) {
  let nutrients = [];
  let entity = {};
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              style={{ textDecoration: "none" }}
              onClick={() => handleAddFood(0)}
            >
              Breakfast
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              style={{ textDecoration: "none" }}
              onClick={() => handleAddFood(1)}
            >
              Lunch{" "}
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              style={{ textDecoration: "none" }}
              onClick={() => handleAddFood(2)}
            >
              Snack{" "}
            </a>
          ),
        },

        {
          key: "4",
          label: (
            <a
              style={{ textDecoration: "none" }}
              onClick={() => handleAddFood(3)}
            >
              Dinner{" "}
            </a>
          ),
        },
        {
          key: "4",
        },
      ]}
    />
  );
  const dispatch = useDispatch();

  const { nutriState, nutriSearchById } = useContext(Context);

  const [previousDish, setPreviousDish] = useState(null);
  const [entityData, setEntityData] = useState(foodData);
  useEffect(() => {
    setPreviousDish(null);
    setEntityData(foodData);
  }, [foodData]);

  //  ADD FOOD

  const handleAddMealPlan = () => {
    handleAddFood()
      .then(messageAntd(messageTypes.success, "Added"))
      .catch((err) => {
        messageAntd(messageTypes.error, err.toString());
      });
  };

  let nutriPercent = {};
  if (Object.keys(entityData).length > 0) {
    const { food, recipe } = entityData;

    entity = food || recipe;
    nutrients = food ? food.nutrients : { ...recipe.totalNutrients };
    if (recipe) {
      for (let index in nutrients) {
        nutrients[index] =
          (+nutrients[index]?.quantity * 100) / recipe.totalWeight;
      }
    }

    nutriPercent = {
      fat: calculatePercentage(
        nutrients.ENERC_KCAL * servingSize,
        nutrients.FAT * servingSize
      ),
      carbs: calculatePercentage(
        nutrients.ENERC_KCAL * servingSize,
        nutrients.CHOCDF * servingSize
      ),
      protein: calculatePercentage(
        nutrients.ENERC_KCAL * servingSize,
        nutrients.PROCNT * servingSize
      ),
    };
  }

  //ADD FOOD FOR TRACKING
  const handleAddFood = async (mealType) => {
    try {
      // alert(typeof servingSize);
      const date = new Date();
      console.log(date);
      const addedFood = {
        addedDate: date.toLocaleDateString(),
        foodName: entity.label,
        foodServing: servingSize,
        foodKCAL: nutrients.ENERC_KCAL,
        mealType,
        id: entityData.food
          ? entity.foodId
          : entity.uri?.substring(entity.uri.indexOf("#") + 1),
        goalKCAL: 3000,
      };
      // console.log(addedFood.addedDate.toLocaleDateString());
      const res = await userApi.addTrackingFood(addedFood);
      if (res.data.isSuccess) {
        console.log(res.data.updatedUser);
        dispatch(
          authSlice.actions.setAuth({
            authLoading: false,
            isAuthenticated: true,
            userInfo: res.data.updatedUser,
          })
        );
        handleCloseModal("close");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewIngredientDetail = async (id) => {
    setPreviousDish(foodData);
    setEntityData(await nutriSearchById(id));
  };

  const backToDish = () => {
    setEntityData(previousDish);
    setPreviousDish(null);
  };
  return (
    <>
      {Object.keys(foodData).length > 0 && (
        <Modal
          size="lg"
          className="overflow-auto mt-4 "
          centered
          show={isShown}
          onHide={() => handleCloseModal("close")}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="d-flex">
                <Image
                  preview={false}
                  width={70}
                  style={{ borderRadius: 10 }}
                  src={entity.image}
                  fallback={dishesPlaceholder}
                />
                <div className="ms-3">
                  <div className="food_name">
                    {entity.label} {entity.brand && "(" + entity.brand + ")"}
                  </div>
                  <div className="food_serving">{entity.category} | 100g</div>
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!!previousDish && (
              <div className="d-flex justify-content-end">
                <Button className="p-0" type="link" onClick={backToDish}>
                  <i className="far fa-arrow-alt-circle-left me-2"></i>Back to{" "}
                  {previousDish.recipe.label}
                </Button>
              </div>
            )}

            <Tabs defaultActiveKey="1">
              <TabPane
                style={{ position: "relative" }}
                tab="Nutritional Ingredients"
                key="1"
              >
                {entityData.food && (
                  // <TabPane tab="Dishes from this ingredient" key="3"></TabPane>
                  <span
                    onClick={() => handleOnViewDishClick(entityData.food.label)}
                    style={{
                      position: "absolute",
                      top: -50,
                      left: 180,
                      cursor: "pointer",
                      color: colors.black,
                    }}
                  >
                    Dishes from this ingredient
                  </span>
                )}
                <Container>
                  <Row className="justify-content-around align-items-center">
                    <div className="calories_items_summary">
                      <div className="calories_item_summary">
                        <CaloriesChart chartData={nutriPercent} />
                        <div className="chart_center_custom">
                          <p>
                            {Math.trunc(nutrients.ENERC_KCAL * servingSize)}
                          </p>
                          <span> cal</span>
                        </div>
                      </div>
                      <div className="calories_item_summary">
                        <div className="calories_carbs_percent">
                          {nutriPercent.carbs}%
                        </div>
                        <div className="calories_carbs_value">
                          {Math.trunc(nutrients.CHOCDF * servingSize)}g
                        </div>
                        <div className="calories_carbs_label">Carbs</div>
                      </div>
                      <div className="calories_item_summary">
                        <div className="calories_fat_percent">
                          {nutriPercent.fat}%
                        </div>
                        <div className="calories_fat_value">
                          {Math.trunc(nutrients.FAT * servingSize)}g
                        </div>
                        <div className="calories_fat_label">Fat</div>
                      </div>
                      <div className="calories_item_summary">
                        <div className="calories_protein_percent">
                          {nutriPercent.protein}%
                        </div>
                        <div className="calories_protein_value">
                          {Math.trunc(nutrients.PROCNT * servingSize)}g
                        </div>
                        <div className="calories_protein_label">Protein</div>
                      </div>
                    </div>
                  </Row>

                  <Row className="mt-3">
                    <Col xs={6} md={6}>
                      <div className="calories_serving_items">
                        <div className="calories_serving_item">
                          <div className="calories_serving_item_label">
                            Serving Size
                          </div>
                          <div className="calories_serving_item_value">
                            {100 * servingSize}g
                          </div>
                        </div>
                        <div className="calories_serving_item d-flex justify-content-between">
                          <div className="calories_serving_item_label">
                            Number of Servings
                          </div>
                          <InputNumber
                            type="number"
                            min={1}
                            max={5}
                            value={servingSize}
                            onChange={handleServingChange}
                            className="calories_serving_item_value"
                            style={{ width: "5rem" }}
                          />
                        </div>
                      </div>{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <div className="calories_detail_item_main">
                        <div className="calories_detail_item_main_label">
                          Calories
                        </div>
                        <div className="calories_detail_item_main_value">
                          {Math.trunc(nutrients.ENERC_KCAL * servingSize)}
                        </div>
                      </div>
                      <div className="calories_detail_item_main">
                        <div className="calories_detail_item_main_label">
                          Total Carbohydrates
                        </div>
                        <div className="calories_detail_item_main_value">
                          {Math.trunc(nutrients.CHOCDF * servingSize)}g
                        </div>
                      </div>
                      <div className="calories_detail_item_sub">
                        <div className="calories_detail_item_sub_label">
                          Dietary Fiber
                        </div>
                        <div className="calories_detail_item_sub_value">
                          {Math.trunc(nutrients.FIBTG * servingSize) || 0}g
                        </div>
                      </div>

                      <div className="calories_detail_item_sub">
                        <div className="calories_detail_item_sub_label">
                          Sugar
                        </div>
                        <div className="calories_detail_item_sub_value">
                          {Math.trunc(nutrients.SUGAR * servingSize ?? 0) ||
                            "-"}
                        </div>
                      </div>
                      <div className="calories_detail_item_sub">
                        <div className="calories_detail_item_sub_label">
                          Added Sugars
                        </div>
                        <div className="calories_detail_item_sub_value">
                          {Math.trunc(
                            nutrients.SUGAR?.added * servingSize ?? 0
                          ) || "-"}
                        </div>
                      </div>
                      <div className="calories_detail_item_sub">
                        <div className="calories_detail_item_sub_label">
                          Sugar Alcohols
                        </div>
                        <div className="calories_detail_item_sub_value">
                          {Math.trunc(
                            nutrients.SUGAR?.alcohol * servingSize ?? 0
                          ) || "-"}
                        </div>
                      </div>
                      <div className="calories_detail_item_main">
                        <div className="calories_detail_item_main_label">
                          Protein
                        </div>
                        <div className="calories_detail_item_main_value">
                          {Math.trunc(nutrients.PROCNT * servingSize)}g
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="calories_detail_item_main">
                        <div className="calories_detail_item_main_label">
                          Vitamin D
                        </div>
                        <div className="calories_detail_item_main_value">
                          {Math.trunc(nutrients.VITD * servingSize ?? 0) || "-"}
                        </div>
                      </div>
                      <div className="calories_detail_item_main">
                        <div className="calories_detail_item_main_label">
                          Calcium
                        </div>
                        <div className="calories_detail_item_main_value">
                          {Math.trunc(nutrients.CA * servingSize ?? 0) || "-"}
                        </div>
                      </div>
                      <div className="calories_detail_item_main">
                        <div className="calories_detail_item_main_label">
                          Iron
                        </div>
                        <div className="calories_detail_item_main_value">
                          {Math.trunc(nutrients.FE * servingSize ?? 0) || "-"}
                        </div>
                      </div>
                      <div className="calories_detail_item_main">
                        <div className="calories_detail_item_main_label">
                          Potassium
                        </div>
                        <div className="calories_detail_item_main_value">
                          {Math.trunc(nutrients.K * servingSize ?? 0) || "-"}
                        </div>
                      </div>
                      <div className="calories_detail_item_main">
                        <div className="calories_detail_item_main_label">
                          Vitamin A
                        </div>
                        <div className="calories_detail_item_main_value">
                          {Math.trunc(nutrients.VITA_RAE * servingSize ?? 0) ||
                            "-"}
                        </div>
                      </div>
                      <div className="calories_detail_item_main">
                        <div className="calories_detail_item_main_label">
                          Vitamin C
                        </div>
                        <div className="calories_detail_item_main_value">
                          {Math.trunc(nutrients.VITC * servingSize ?? 0) || "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </TabPane>

              {entityData.recipe && (
                <TabPane tab="Recipe" key="2">
                  <Container>
                    <div className="d-flex justify-content-center align-items-center">
                      <Row style={{ height: 500, overflowX: "hidden" }}>
                        {entity.ingredients?.map((ingr, i) => (
                          <Col xs={6} md={6} xl={6} key={i}>
                            <div
                              className="common-float mt-2 ms-3 d-flex position-relative"
                              style={{ height: 120 }}
                            >
                              <Image
                                width={90}
                                src={
                                  ingr.image ? ingr.image : dishesPlaceholder
                                }
                              ></Image>
                              <div className="ms-3 d-flex flex-column align-items-start">
                                <Text italic>{ingr.text}</Text>
                                <Text italic>
                                  <strong>Total weight: </strong>
                                  {Math.trunc(ingr.weight * servingSize)}g
                                </Text>
                                <Button
                                  className="p-0"
                                  type="link"
                                  onClick={() =>
                                    handleViewIngredientDetail(ingr.foodId)
                                  }
                                >
                                  View ingredient detail
                                </Button>
                              </div>
                              <Tag
                                color={
                                  filterNutrition.measure[ingr.measure]?.color
                                }
                                className="position-absolute bottom-0 end-0 translate-middle-y"
                              >
                                {ingr.quantity + " "}
                                {!ingr.measure || ingr.measure === "<unit>"
                                  ? "unit"
                                  : ingr.measure}
                              </Tag>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Container>
                </TabPane>
              )}
            </Tabs>
          </Modal.Body>

          <Modal.Footer>
            <button
              style={{ padding: 10 }}
              className="common-button common-button-grey"
              onClick={() => handleCloseModal("close")}
            >
              Close
            </button>
            <AddFoodButton menu={menu}>Add</AddFoodButton>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

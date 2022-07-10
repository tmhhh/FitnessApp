import {useState, forwardRef} from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CaloriesChart from "./CaloriesChart";
import "./style.scss";
import {calculatePercentage} from "../../../../utils/calculate";
import {useDispatch} from "react-redux";
import authSlice from "../../../../redux/slices/authSlice";
import userApi from "../../../../api/userApi";
import messageAntd, {messageTypes} from "../../../Common/Toast/message";
import {Dropdown} from "react-bootstrap";

const addFoodButton = forwardRef(({children, onClick}, ref) => (
    <button
        type="button"
        className="common-button common-button-green"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </button>
));

export default function FoodModal({
                                      handleCloseModal,
                                      modal: {
                                          isShown,
                                          foodData,
                                          foodData: {food},
                                      },
                                      setServingSize,
                                      servingSize,
                                      handleServingChange,
                                      goalKCAL,
                                  }) {
    const dispatch = useDispatch();

    //  ADD FOOD
    const [mealType, setMealType] = useState(0);

    const handleAddMealPlan = () => {
        handleAddFood().then(
            messageAntd(messageTypes.success, 'Added')
        ).catch(err => {
            messageAntd(messageTypes.error, err.toString())
        });
    }

    let nutriPercent = {};
    if (Object.keys(foodData).length > 0)
        nutriPercent = {
            fat: calculatePercentage(
                food.nutrients.ENERC_KCAL * servingSize,
                food.nutrients.FAT * servingSize
            ),
            carbs: calculatePercentage(
                food.nutrients.ENERC_KCAL * servingSize,
                food.nutrients.CHOCDF * servingSize
            ),
            protein: calculatePercentage(
                food.nutrients.ENERC_KCAL * servingSize,
                food.nutrients.PROCNT * servingSize
            ),
        };

    //ADD FOOD FOR TRACKING
    const handleAddFood = async () => {
        try {
            // alert(typeof servingSize);
            const date = new Date();
            const addedFood = {
                addedDate: date.toLocaleDateString(),
                foodName: food.label,
                foodServing: servingSize,
                foodKCAL: food.nutrients.ENERC_KCAL,
                mealType,
                id: food.foodId,
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
                            <div className="food_name">
                                {food.label} {food.brand && "(" + food.brand + ")"}
                            </div>
                            <div className="food_serving">{food.category} | 100g</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={12}>
                                    <div className="calories_items_summary">
                                        <div className="calories_item_summary">
                                            <CaloriesChart chartData={nutriPercent}/>
                                        </div>
                                        <div className="chart_center_custom">
                                            <p>
                                                {Math.trunc(food.nutrients.ENERC_KCAL * servingSize)}
                                            </p>
                                            <span> cal</span>
                                        </div>
                                        <div className="calories_item_summary">
                                            <div className="calories_carbs_percent">
                                                {nutriPercent.carbs}%
                                            </div>
                                            <div className="calories_carbs_value">
                                                {Math.trunc(food.nutrients.CHOCDF * servingSize)}g
                                            </div>
                                            <div className="calories_carbs_label">Carbs</div>
                                        </div>
                                        <div className="calories_item_summary">
                                            <div className="calories_fat_percent">
                                                {nutriPercent.fat}%
                                            </div>
                                            <div className="calories_fat_value">
                                                {Math.trunc(food.nutrients.FAT * servingSize)}g
                                            </div>
                                            <div className="calories_fat_label">Fat</div>
                                        </div>
                                        <div className="calories_item_summary">
                                            <div className="calories_protein_percent">
                                                {nutriPercent.protein}%
                                            </div>
                                            <div className="calories_protein_value">
                                                {Math.trunc(food.nutrients.PROCNT * servingSize)}g
                                            </div>
                                            <div className="calories_protein_label">Protein</div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={5}>
                                    <div className="calories_serving_items">
                                        <div className="calories_serving_item">
                                            <div className="calories_serving_item_label">
                                                Serving Size
                                            </div>
                                            <div className="calories_serving_item_value">
                                                {100 * servingSize}g
                                            </div>
                                        </div>
                                        <div className="calories_serving_item">
                                            <div className="calories_serving_item_label">
                                                Number of Servings
                                            </div>
                                            <input
                                                type="number"
                                                min={1}
                                                max={5}
                                                value={servingSize}
                                                onChange={handleServingChange}
                                                className="calories_serving_item_value"
                                            />
                                        </div>
                                    </div>
                                    {" "}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <div className="calories_detail_item_main">
                                        <div className="calories_detail_item_main_label">
                                            Calories
                                        </div>
                                        <div className="calories_detail_item_main_value">
                                            {Math.trunc(food.nutrients.ENERC_KCAL * servingSize)}
                                        </div>
                                    </div>
                                    <div className="calories_detail_item_main">
                                        <div className="calories_detail_item_main_label">
                                            Total Carbohydrates
                                        </div>
                                        <div className="calories_detail_item_main_value">
                                            {Math.trunc(food.nutrients.CHOCDF * servingSize)}g
                                        </div>
                                    </div>
                                    <div className="calories_detail_item_sub">
                                        <div className="calories_detail_item_sub_label">
                                            Dietary Fiber
                                        </div>
                                        <div className="calories_detail_item_sub_value">
                                            {Math.trunc(food.nutrients.FIBTG * servingSize)}g
                                        </div>
                                    </div>

                                    <div className="calories_detail_item_sub">
                                        <div className="calories_detail_item_sub_label">Sugar</div>
                                        <div className="calories_detail_item_sub_value">-</div>
                                    </div>
                                    <div className="calories_detail_item_sub">
                                        <div className="calories_detail_item_sub_label">
                                            Added Sugars
                                        </div>
                                        <div className="calories_detail_item_sub_value">-</div>
                                    </div>
                                    <div className="calories_detail_item_sub">
                                        <div className="calories_detail_item_sub_label">
                                            Sugar Alcohols
                                        </div>
                                        <div className="calories_detail_item_sub_value">-</div>
                                    </div>
                                    <div className="calories_detail_item_main">
                                        <div className="calories_detail_item_main_label">
                                            Protein
                                        </div>
                                        <div className="calories_detail_item_main_value">
                                            {Math.trunc(food.nutrients.PROCNT * servingSize)}g
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="calories_detail_item_main">
                                        <div className="calories_detail_item_main_label">
                                            Vitamin D
                                        </div>
                                        <div className="calories_detail_item_main_value">-</div>
                                    </div>
                                    <div className="calories_detail_item_main">
                                        <div className="calories_detail_item_main_label">
                                            Calcium
                                        </div>
                                        <div className="calories_detail_item_main_value">-</div>
                                    </div>
                                    <div className="calories_detail_item_main">
                                        <div className="calories_detail_item_main_label">Iron</div>
                                        <div className="calories_detail_item_main_value">-</div>
                                    </div>
                                    <div className="calories_detail_item_main">
                                        <div className="calories_detail_item_main_label">
                                            Potassium
                                        </div>
                                        <div className="calories_detail_item_main_value">-</div>
                                    </div>
                                    <div className="calories_detail_item_main">
                                        <div className="calories_detail_item_main_label">
                                            Vitamin A
                                        </div>
                                        <div className="calories_detail_item_main_value">-</div>
                                    </div>
                                    <div className="calories_detail_item_main">
                                        <div className="calories_detail_item_main_label">
                                            Vitamin C
                                        </div>
                                        <div className="calories_detail_item_main_value">-</div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="common-button common-button-grey"
                            onClick={() => handleCloseModal("close")}
                        >
                            Close
                        </button>
                        <Dropdown>
                            <Dropdown.Toggle as={addFoodButton}>
                                Add
                            </Dropdown.Toggle>

                            <Dropdown.Menu onClick={handleAddMealPlan} onMouseDown={(e) => setMealType(+e.target.getAttribute('value'))}>
                                <Dropdown.Item value={0}><i className="fas fa-bread-slice"></i> Breakfast</Dropdown.Item>
                                <Dropdown.Item value={1}><i className="fas fa-drumstick-bite"></i> Lunch</Dropdown.Item>
                                <Dropdown.Item value={2}><i className="fas fa-pizza-slice"></i> Snacks</Dropdown.Item>
                                <Dropdown.Item value={3}><i className="fas fa-utensils"></i> Dinner</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

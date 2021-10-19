import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CaloriesChart from "./CaloriesChart";
import "./style.scss";
import { calculatePercentage } from "../../../../utils/calculate";
export default function FoodModal({
  handleCloseModal,
  modal: {
    isShown,
    foodData,
    foodData: { food },
  },
  servingSize,
  handleServingChange,
}) {
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

  return (
    <>
      {Object.keys(foodData).length > 0 && (
        <Modal
          className="overflow-auto mt-4 "
          centered
          show={isShown}
          onHide={handleCloseModal}
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
            <div className="calories_items_summary">
              <CaloriesChart chartData={nutriPercent} />
              <div className="chart_center_custom">
                {Math.trunc(food.nutrients.ENERC_KCAL * servingSize)}
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
                <div className="calories_fat_percent">{nutriPercent.fat}%</div>
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
            <div className="calories_serving_items">
              <div className="calories_serving_item">
                <div className="calories_serving_item_label">Serving Size</div>
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
            <div className="calories_detail_items">
              <div className="calories_detail_item_main">
                <div className="calories_detail_item_main_label">Calories</div>
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
            </div>
            <div className="calories_detail_item_main">
              <div className="calories_detail_item_main_label">Protein</div>
              <div className="calories_detail_item_main_value">
                {Math.trunc(food.nutrients.PROCNT * servingSize)}g
              </div>
            </div>
            <div className="calories_detail_item_main">
              <div className="calories_detail_item_main_label">Vitamin D</div>
              <div className="calories_detail_item_main_value">-</div>
            </div>
            <div className="calories_detail_item_main">
              <div className="calories_detail_item_main_label">Calcium</div>
              <div className="calories_detail_item_main_value">-</div>
            </div>
            <div className="calories_detail_item_main">
              <div className="calories_detail_item_main_label">Iron</div>
              <div className="calories_detail_item_main_value">-</div>
            </div>
            <div className="calories_detail_item_main">
              <div className="calories_detail_item_main_label">Potassium</div>
              <div className="calories_detail_item_main_value">-</div>
            </div>
            <div className="calories_detail_item_main">
              <div className="calories_detail_item_main_label">Vitamin A</div>
              <div className="calories_detail_item_main_value">-</div>
            </div>
            <div className="calories_detail_item_main">
              <div className="calories_detail_item_main_label">Vitamin C</div>
              <div className="calories_detail_item_main_value">-</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Next
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

import React, { Fragment, useContext } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { NutritionContext } from "../../../Contexts/NutritionContext";
import NutritionLayout from "../../Layouts/NutritionLayout";
import Navbar from "../../Navbar/Navbar";
import SearchBar from "../../SearchBar/SearchBar";
import "./style.scss";

export default function NutritionPage() {
  const { nutriState } = useContext(NutritionContext);
  return (
    <>
      <Navbar />
      <NutritionLayout>
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
                          <div className="food_image">
                            <img src={e.food.image} alt={e.food.label} />
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
      </NutritionLayout>
    </>
  );
}

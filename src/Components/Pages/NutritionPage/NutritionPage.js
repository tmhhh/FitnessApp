import React, { useContext } from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import SearchBar from "../../SearchBar/SearchBar";

import "./style.scss";
import { Spinner } from "react-bootstrap";
import NutritionContextProvider, {
  NutritionContext,
} from "../../../Contexts/NutritionContext";
import { Row, Col } from "react-bootstrap";
import { IndexedSourceMapConsumer } from "webpack-sources/node_modules/source-map";
export default function NutritionPage() {
  const { nutriState } = useContext(NutritionContext);
  return (
    <>
      {/* <NutritionContextProvider> */}
      <Navbar />
      <div className="nutrition_section">
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
          nutriState.listFoods.length > 0 ? (
            <>
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
                {nutriState.listFoods.map((e, index) => (
                  <Row style={{ marginBottom: "30px " }} key={index}>
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
                        <p>Protein: {Math.trunc(e.food.nutrients.PROCNT)}g</p>
                        <p>Fat: {Math.trunc(e.food.nutrients.FAT)}g</p>
                        <p>Carbs: {Math.trunc(e.food.nutrients.FIBTG)}g</p>
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            </>
          ) : null
        ) : null}
      </div>
      <Footer />
    </>
  );
}

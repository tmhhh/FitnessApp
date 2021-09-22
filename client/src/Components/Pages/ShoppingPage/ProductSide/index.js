import { Row, Spinner, Col } from "react-bootstrap";
import ProductCard from "../../../Card/ProductCard";
import SearchBar from "../../../Common/SearchBar";
export default function ProductSide({
  prodSelector: { prodLoading, listProducts },
}) {
  return (
    <>
      <SearchBar />
      <div className="product_container">
        <Row>
          {
            prodLoading ? (
              <Spinner
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  // transform: "translate(-50%,-50%)",
                }}
                animation="border"
                variant="info"
              />
            ) : (
              // ) : searchOption.byCate === "All" ? (
              listProducts.map((prod) => (
                <Col lg={4} key={prod._id}>
                  <ProductCard {...prod} />
                </Col>
              ))
            )
            // ) : (
            //   listFilteredProducts.map((prod) => (
            //     <Col lg={4} key={prod._id}>
            //       <ProductCard {...prod} />
            //     </Col>
            //   ))
            // )}
            // )}
          }
        </Row>
      </div>
    </>
  );
}

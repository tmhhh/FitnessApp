import { Row, Spinner, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../../redux/slices/prodSlice";
import ProductCard from "../../../Card/ProductCard";
import Pagination from "../../../Common/Pagination/Pagination";
import SearchBar from "../../../Common/SearchBar";
import NoResults from "../../../Common/Placeholders/NoResults";
import CustomLoading from "../../../Common/Placeholders/CustomLoading";
export default function ProductSide({
  prodLoading,
  listProducts,
  searchOption,
}) {
  const dispatch = useDispatch();
  const handlePageChange = (options) => {
    dispatch(getProduct(options));
  };

  const totalPages = useSelector((state) => state.prodReducer.totalPages);
  return (
    <>
      <SearchBar />
      <div className="product_container">
        <Row>
          {
            prodLoading ? (
                <CustomLoading />
            ) : // ) : searchOption.option === "All" ? (
            listProducts.length === 0 ? (
              <h3
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  width: "500px",
                  flexWrap: "wrap",
                  display: "flex",
                  alignItems: "center",
                  textTransform: "uppercase",
                  fontWeight: "600",
                  fontSize: "2rem",
                  color: "#999",
                  transform: "translate(-50%,-50%)",
                }}
              >
                  <NoResults/>
              </h3>
            ) : (
              listProducts.map((prod) => (
                <Col xs={12} sm={6} md={6} lg={4} key={prod._id}>
                  <ProductCard
                    {...prod}
                    status={prod.prodQuantity === 0 && "out_of_stock"}
                  />
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
      {/* {listProducts.length !== 0 && ( */}
      <div className="w-100 d-flex justify-content-center mb-4">
        <Pagination
          numOfPages={listProducts.length === 0 ? 0 : totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      {/* )} */}
    </>
  );
}

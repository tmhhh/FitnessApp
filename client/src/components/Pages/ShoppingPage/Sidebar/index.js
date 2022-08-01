import Form from "react-bootstrap/Form";
import "./style.scss";
export default function Sidebar({
  listCate,
  handleSearchByCateType,
  handleSearchByCateFilter,
  handleShowFavoriteProds,
  handleSearchByPrice,
  searchOption,
  setSearchOption,
  isAuthenticated,
  listFavorites,
  totalFavorite,
}) {
  // const [cb, setCb] = useState({ cb1: false, cb2: false, cb3: false });
  const listFilter = [];
  if (searchOption.category !== "All") {
    for (const cate of listCate) {
      if (cate._id === searchOption.category) {
        for (const e of cate.cateFilter) {
          listFilter.push(e);
        }
      }
    }
  }

  //HANDLE ON CLICK

  // const handleOnCLick = (option, type) => {
  //   if (type === "cate") handleSearchByCateType(option);
  //   else if (type === "filter") handleSearchByCateFilter(option);
  //   else handleShowFavoriteProds();
  // };
  return (
    <div className="side_bar">
      <div className="other_products">
        <h3 className="other_products_title">
          CATEGORY<i className="fas fa-list"></i>
        </h3>
        <p
          onClick={() =>
            // setCb({ cb1: false, cb2: false, cb3: false });
            // handleOnCLick("All", "cate");
            setSearchOption({
              ...searchOption,
              category: "All",
              cateFilter: null,
              favorite: { isChosen: false, listFavorites: [] },
            })
          }
          className="other_products_item common-hover"
        >
          All
        </p>
        {listCate.map((e) => (
          <p
            onClick={() => {
              setSearchOption({
                ...searchOption,
                cateFilter: null,
                category: e._id,
              });
            }}
            key={e._id}
            className="other_products_item common-hover"
          >
            {e.cateName}
          </p>
        ))}
      </div>
      <div className="product_type">
        <h3 className="product_type_title">
          FILTER
          <i
            className={
              listFilter.length > 0
                ? `fas fa-chevron-down`
                : "fas fa-chevron-up"
            }
          ></i>
        </h3>
        {listFilter.map((e, index) => (
          <p
            className="common-hover"
            onClick={() => {
              setSearchOption({ ...searchOption, cateFilter: e._id });
            }}
            key={index}
          >
            {e.filterName}
          </p>
        ))}
      </div>
      <div className="other_products">
        <h3 className="other_products_title">
          PRICE {searchOption.price && `($0 -> $${searchOption.price})`}
          <ion-icon name="funnel-outline"></ion-icon>
        </h3>
        {/* <form>
          <input
            checked={cb.cb1}
            onClick={() => {
              setCb({ cb1: true, cb2: false, cb3: false });
              setSearchOption({ ...searchOption, price: 0 });
            }}
            style={{ margin: "0 20px 10px 20px" }}
            type="radio"
            id="cb1"
            name="cbPrice"
          />
          <label
            style={{
              marginBottom: "10px",
              fontSize: "15px",
              fontWeight: "500",
              color: "#999",
            }}
            for="cb1"
          >
            10$ -> 40$
          </label>
          <br />

          <input
            checked={cb.cb2}
            onClick={() => {
              setCb({ cb1: false, cb2: true, cb3: false });
              setSearchOption({ ...searchOption, price: 1 });
            }}
            style={{ margin: "0 20px 10px 20px" }}
            type="radio"
            id="cb2"
            name="cbPrice"
          />
          <label
            style={{
              marginBottom: "10px",
              fontSize: "15px",
              fontWeight: "500",
              color: "#999",
            }}
            for="cb2"
          >
            40$ -> 80$
          </label>
          <br />

          <input
            checked={cb.cb3}
            onClick={() => {
              setCb({ cb1: false, cb2: false, cb3: true });
              setSearchOption({ ...searchOption, price: 2 });
            }}
            style={{ margin: "0 20px 10px 20px" }}
            type="radio"
            id="cb3"
            name="cbPrice"
          />
          <label
            style={{
              marginBottom: "10px",
              fontSize: "15px",
              fontWeight: "500",
              color: "#999",
            }}
            for="cb3"
          >
            {" "}
            80$ -> 100$
          </label>
          <br />
        </form> */}
        <Form.Range
          onChange={(e) =>
            setSearchOption({ ...searchOption, price: e.target.value })
          }
        />
      </div>

      {isAuthenticated && (
        <h3
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSearchOption({
              ...searchOption,
              favorite: { listFavorites, isChosen: true },
            })
          }
          className="other_products_title common-hover"
        >
          FAVORITE ({totalFavorite})<i className="far fa-heart"></i>
        </h3>
      )}
    </div>
  );
}

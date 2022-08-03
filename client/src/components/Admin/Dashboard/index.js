import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import billApi from "../../../api/billApi.js";
import postApi from "../../../api/postApi";
import prodApi from "../../../api/prodApi.js";
import userApi from "../../../api/userApi.js";
import {
  PROD_IMAGE_BASE_URL,
  USER_IMAGE_BASE_URL,
} from "../../../assets/constants";
import { formatCurrency } from "../../../utils/formatCurrency";
import BarChart from "../../Common/Chart/BarChart.js";
import LineChart from "../../Common/Chart/LineChart.js";
import PieChart from "../../Common/Chart/PieChart";
import Spinner from "../../Common/Spinner";
import "./style.scss";
export default function Dashboard() {
  const history = useHistory();
  //GET STATISTICAL DATA -- LOCAL STATE
  const [statisticalData, setStatisticalData] = useState({
    dataLoading: true,
    totalNumbCustomers: null,
    totalNumbProds: null,
    totalNumbPosts: null,
    yearRevenue: null,
    topCustomers: [],
    topProds: [],
    prodPercentByCate: [],
    favoriteProds: [],
  });
  const {
    dataLoading,
    totalNumbCustomers,
    totalNumbPosts,
    totalNumbProds,
    yearRevenue,
    topCustomers,
    topProds,
    prodPercentByCate,
    favoriteProds,
  } = statisticalData;

  //GET DATA FOR STATISTICS
  const getStatisticalData = async () => {
    try {
      const res = await Promise.all([
        userApi.getTotalNumbCustomers(),
        prodApi.totalNumbProds(),
        postApi.getTotalNumbPosts(),
        billApi.getRevenueByYear(),
      ]);

      setStatisticalData({
        dataLoading: false,
        totalNumbCustomers: res[0].data.totalNumbCustomers,
        totalNumbProds: res[1].data.totalNumbProds,
        favoriteProds: res[1].data.favoriteProds,
        prodPercentByCate: res[1].data.prodPercentByCate,
        totalNumbPosts: res[2].data.totalNumbPosts,
        yearRevenue: res[3].data.yearRevenue,
        topCustomers: res[3].data.topCustomers,
        topProds: res[3].data.topProds,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStatisticalData();
  }, []);
  return (
    <div className="dashboard__container">
      <div className="dashboard__left">
        <div className="dashboard__left__header common-float">
          <h2 className="dashboard__left__header-title">Dashboard</h2>
          <div className="dashboard__left__header-settings">
            <i className="fas fa-cog"></i>
          </div>
        </div>
        <div className="dashboard__left__body">
          <div className="dashboard__left__body-summary">
            <div className="summary__item common-float">
              <p className="summary__item-title">
                Products
                <i style={{ color: "#b4e2e4" }} className="fas fa-box-open"></i>
              </p>
              <div className="summary__item-value">
                {dataLoading ? <Spinner /> : totalNumbProds}
              </div>
            </div>
            <div className="summary__item common-float">
              <p className="summary__item-title">
                Customers
                <i
                  style={{ color: "#e0c3e2" }}
                  className="fas fa-users"
                ></i>{" "}
              </p>
              <div className="summary__item-value">
                {dataLoading ? <Spinner /> : totalNumbCustomers}
              </div>
            </div>
            <div className="summary__item common-float">
              <p className="summary__item-title">
                Posts
                <i
                  style={{ color: "#fcc0c4" }}
                  className="fas fa-address-book"
                ></i>{" "}
              </p>
              <div className="summary__item-value">
                {dataLoading ? <Spinner /> : totalNumbPosts}
              </div>
            </div>
          </div>
          {/* <div className="dashboard__left__body-chart-title">Activity</div> */}
          <div className="dashboard__left__body-chart common-float">
            <LineChart
              listLabels={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ]}
              listData={yearRevenue}
            />
          </div>
        </div>
      </div>
      <div className="dashboard__right">
        <div style={{ marginTop: 40 }} className="dashboard__right__item">
          <h3 className="dashboard__right__item-title common-float">
            🛍 Top buyers this month
          </h3>
          <div className="dashboard__right__item__container">
            {topCustomers.map((e, index) => (
              <div
                key={e.user._id}
                className={
                  "dashboard__right__item__details " +
                  `common-rank-items-${index + 1}`
                }
              >
                <div className="dashboard__right__item__details-left">
                  <div className="item-image">
                    <img
                      src={
                        e.user.userImage.includes("http")
                          ? e.user.userImage
                          : `${USER_IMAGE_BASE_URL}/${e.user.userImage}`
                      }
                      alt={e.user.userName}
                    />
                  </div>
                  <div className="item-name">{e.user.userName}</div>
                </div>
                <div className="dashboard__right__item__details-center">
                  {e.user.userNameID}
                </div>

                <div className="dashboard__right__item__details-right">
                  {formatCurrency(e.totalSpend)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 120 }} className="dashboard__right__item">
          <h3 className="dashboard__right__item-title common-float">
            💰 Best seller
          </h3>
          {topProds.map((e, index) => (
            <div
              key={e.product._id}
              className={
                "dashboard__right__item__details " +
                `common-rank-items-${index + 1}`
              }
            >
              <div className="dashboard__right__item__details-left">
                <div className="item-image product-image">
                  <img
                    src={PROD_IMAGE_BASE_URL + e.product.prodThumbnail}
                    alt={e.product.prodName}
                  />
                </div>
                <div
                  onClick={() => history.push(`/product/${e.product._id}`)}
                  className="item-name"
                >
                  {e.product.prodName}
                </div>
              </div>

              <div className="dashboard__right__item__details-right">
                x{e.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard__bottom">
        <div className="dashboard__bottom__chart common-float">
          {/* <div className="dashboard__bottom__chart-title">Activity</div> */}
          <PieChart listData={prodPercentByCate} />
        </div>
        <div className="dashboard__bottom__chart common-float">
          {/* <div className="dashboard__bottom__chart-title">Activity</div> */}
          <BarChart listData={favoriteProds} />
        </div>
      </div>
    </div>
  );
}

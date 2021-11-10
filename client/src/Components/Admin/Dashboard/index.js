import { useEffect, useState } from "react";
import LineChart from "../../Common/Chart/LineChart.js";
import { useSelector } from "react-redux";
import "./style.scss";
import {
  USER_IMAGE_BASE_URL,
  PROD_IMAGE_BASE_URL,
} from "../../../assets/constants";
import PieChart from "../../Common/Chart/PieChart";
import BarChart from "../../Common/Chart/BarChart.js";
import prodApi from "../../../api/prodApi.js";
import userApi from "../../../api/userApi.js";
import billApi from "../../../api/billApi.js";
import postApi from "../../../api/postApi";
import Spinner from "../../Common/Spinner";
import { formatCurrency } from "../../../utils/formatCurrency";
export default function Dashboard() {
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
  });
  const { userInfo } = useSelector((state) => state.authReducer);
  const {
    dataLoading,
    totalNumbCustomers,
    totalNumbPosts,
    totalNumbProds,
    yearRevenue,
    topCustomers,
    topProds,
    prodPercentByCate,
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
      console.log(res[3].data);
      setTimeout(
        () =>
          setStatisticalData({
            dataLoading: false,
            totalNumbCustomers: res[0].data.totalNumbCustomers,
            totalNumbProds: res[1].data.totalNumbProds,
            prodPercentByCate: res[1].data.prodPercentByCate,
            totalNumbPosts: res[2].data.totalNumbPosts,
            yearRevenue: res[3].data.yearRevenue,
            topCustomers: res[3].data.topCustomers,
            topProds: res[3].data.topProds,
          }),
        1000
      );
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
        <div className="dashboard__left__header">
          <h2 className="dashboard__left__header-title">Dashboard</h2>
          <div className="dashboard__left__header-settings">
            <i className="fas fa-cog"></i>
          </div>
        </div>
        <div className="dashboard__left__body">
          <div className="dashboard__left__body-summary">
            <div className="summary__item">
              <p className="summary__item-title">
                Products
                <i style={{ color: "#b4e2e4" }} className="fas fa-box-open"></i>
              </p>
              <div className="summary__item-value">
                {dataLoading ? <Spinner /> : totalNumbProds}
              </div>
            </div>
            <div className="summary__item">
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
            <div className="summary__item">
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
          <div className="dashboard__left__body-chart-title">Activity</div>
          <div className="dashboard__left__body-chart">
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
        <div className="dashboard__right__item">
          <h3 className="dashboard__right__item-title">
            Top buyers this month
          </h3>
          {topCustomers.map((e) => (
            <div className="dashboard__right__item__details">
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
        <div className="dashboard__right__item">
          <h3 className="dashboard__right__item-title">Best seller</h3>
          {topProds.map((e) => (
            <div className="dashboard__right__item__details">
              <div className="dashboard__right__item__details-left">
                <div className="item-image">
                  <img
                    src={PROD_IMAGE_BASE_URL + e.product.prodThumbnail}
                    alt={e.product.prodName}
                  />
                </div>
                <div className="item-name">{e.product.prodName}</div>
              </div>

              <div className="dashboard__right__item__details-right">
                x{e.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard__bottom">
        <div className="dashboard__bottom__chart">
          <div className="dashboard__bottom__chart-title">Activity</div>
          <PieChart listData={prodPercentByCate} />
        </div>
        <div className="dashboard__bottom__chart">
          <div className="dashboard__bottom__chart-title">Activity</div>
          <BarChart />
        </div>
      </div>
    </div>
  );
}

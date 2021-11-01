import React from "react";
import LineChart from "../../Common/Chart/LineChart.js";
import { useSelector } from "react-redux";
import "./style.scss";
import { USER_IMAGE_BASE_URL } from "../../../assets/constants";

export default function Dashboard() {
  const { userInfo } = useSelector((state) => state.authReducer);
  const [click, setClick] = React.useState(false);
  return (
    <div className="dashboard__container">
      <div className="dashboard__left">
        <div className="dashboard__left__header">
          <h2 className="dashboard__left__header-title">Dashboard</h2>
          <div className="dashboard__left__header-settings">
            <i onClick={() => setClick(true)} className="fas fa-cog"></i>
            {click && "asdasdasdasdasdad"}
          </div>
        </div>
        <div className="dashboard__left__body">
          <div className="dashboard__left__body-summary">
            <div className="summary__item">
              <p className="summary__item-title">
                Products
                <i style={{ color: "#f49927" }} className="fas fa-box-open"></i>
              </p>
              <div className="summary__item-value">27.6m</div>
            </div>
            <div className="summary__item">
              <p className="summary__item-title">
                Users
                <i
                  style={{ color: "#36b5bb" }}
                  className="fas fa-users"
                ></i>{" "}
              </p>
              <div className="summary__item-value">27.6m</div>
            </div>
            <div className="summary__item">
              <p className="summary__item-title">
                Posts
                <i
                  style={{ color: "#fcbec2" }}
                  className="fas fa-address-book"
                ></i>{" "}
              </p>
              <div className="summary__item-value">27.6m</div>
            </div>
          </div>
          <div className="dashboard__left__body-chart-title">Activity</div>
          <div className="dashboard__left__body-chart">
            <LineChart />
          </div>
        </div>
      </div>
      <div className="dashboard__right">
        <div className="dashboard__right__item">
          <h3 className="dashboard__right__item-title">Top performers</h3>
          <div className="dashboard__right__item__details">
            <div className="dashboard__right__item__details-left">
              <div className="item-image">
                <img
                  src={
                    userInfo.userImage.includes("http")
                      ? userInfo.userImage
                      : `${USER_IMAGE_BASE_URL}/${userInfo.userImage}`
                  }
                  alt=""
                />
              </div>
              <div className="item-name">{userInfo.userName}</div>
            </div>
            <div className="dashboard__right__item__details-center">
              @tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206
            </div>

            <div className="dashboard__right__item__details-right">20%</div>
          </div>
          <div className="dashboard__right__item__details">
            <div className="dashboard__right__item__details-left">
              <div className="item-image">
                <img
                  src={
                    userInfo.userImage.includes("http")
                      ? userInfo.userImage
                      : `${USER_IMAGE_BASE_URL}/${userInfo.userImage}`
                  }
                  alt=""
                />
              </div>
              <div className="item-name">Hoang</div>
            </div>
            <div className="dashboard__right__item__details-center">
              @tmh1206
            </div>

            <div className="dashboard__right__item__details-right">20%</div>
          </div>
          <div className="dashboard__right__item__details">
            <div className="dashboard__right__item__details-left">
              <div className="item-image">
                <img
                  src={
                    userInfo.userImage.includes("http")
                      ? userInfo.userImage
                      : `${USER_IMAGE_BASE_URL}/${userInfo.userImage}`
                  }
                  alt=""
                />
              </div>
              <div className="item-name">Hoang</div>
            </div>
            <div className="dashboard__right__item__details-center">
              @tmh1206
            </div>

            <div className="dashboard__right__item__details-right">20%</div>
          </div>
        </div>
        <div className="dashboard__right__item">
          <h3 className="dashboard__right__item-title">Top performers</h3>
          <div className="dashboard__right__item__details">
            <div className="dashboard__right__item__details-left">
              <div className="item-image">
                <img
                  src={
                    userInfo.userImage.includes("http")
                      ? userInfo.userImage
                      : `${USER_IMAGE_BASE_URL}/${userInfo.userImage}`
                  }
                  alt=""
                />
              </div>
              <div className="item-name">{userInfo.userName}</div>
            </div>
            <div className="dashboard__right__item__details-center">
              @tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206@tmh1206
            </div>

            <div className="dashboard__right__item__details-right">20%</div>
          </div>
          <div className="dashboard__right__item__details">
            <div className="dashboard__right__item__details-left">
              <div className="item-image">
                <img
                  src={
                    userInfo.userImage.includes("http")
                      ? userInfo.userImage
                      : `${USER_IMAGE_BASE_URL}/${userInfo.userImage}`
                  }
                  alt=""
                />
              </div>
              <div className="item-name">Hoang</div>
            </div>
            <div className="dashboard__right__item__details-center">
              @tmh1206
            </div>

            <div className="dashboard__right__item__details-right">20%</div>
          </div>
          <div className="dashboard__right__item__details">
            <div className="dashboard__right__item__details-left">
              <div className="item-image">
                <img
                  src={
                    userInfo.userImage.includes("http")
                      ? userInfo.userImage
                      : `${USER_IMAGE_BASE_URL}/${userInfo.userImage}`
                  }
                  alt=""
                />
              </div>
              <div className="item-name">Hoang</div>
            </div>
            <div className="dashboard__right__item__details-center">
              @tmh1206
            </div>

            <div className="dashboard__right__item__details-right">20%</div>
          </div>
        </div>
      </div>
      {/* <div className="dashboard__bottom"></div> */}
    </div>
  );
}

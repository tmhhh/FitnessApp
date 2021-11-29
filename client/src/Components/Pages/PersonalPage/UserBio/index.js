import { useState, useRef, useContext } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import BioForm from "./BioForm";
import PasswordForm from "./PasswordForm";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { USER_IMAGE_BASE_URL } from "../../../../assets/constants";
import authSlice from "../../../../redux/slices/authSlice";
import userApi from "../../../../api/userApi";
import { Context } from "../../../../Contexts";
export default function UserBio() {
  const { setToast } = useContext(Context);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [key, setKey] = useState("information");
  const imgRef = useRef(null);

  const handleUpdateAvatar = async (e) => {
    try {
      const formData = new FormData();
      formData.append("userImage", uploadedImage);
      const res = await userApi.updateAvatar(formData);
      if (res.data.isSuccess) {
        setToast({
          toastShow: true,
          title: "Upload successfully",
          content: "Have a great day :)",
          icon: "✔",
          bg: "success",
        });
        return dispatch(authSlice.actions.setUserAvatar(uploadedImage.name));
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400)
        setToast({
          toastShow: true,
          title: "Failed to upload",
          content: error.response.data.message,
          icon: "❌",
          bg: "warning",
        });
    }
  };
  const updatedProfile = async (values) => {
    try {
      const data = { ...values };
      delete data.userConfirmPassword;
      const res = await userApi.updateProfile(data);
      if (res.data.isSuccess) {
        setToast({
          toastShow: true,
          title: "Update successfully",
          content: "Have a great day :)",
          icon: "✔",
          bg: "success",
        });
        return dispatch(authSlice.actions.setUserProfile(res.data.updatedUser));
      }
    } catch (error) {
      console.log(error);
      setToast({
        toastShow: true,
        title: "Failed to upload",
        content: "Please try again later",
        icon: "❌",
        bg: "warning",
      });
    }
  };

  const handleChangePassword = async (values) => {
    try {
      const res = await userApi.updatePassword(values.userPassword);
      if (res.data.isSuccess) {
        setToast({
          toastShow: true,
          title: "Update successfully",
          content: "Have a great day :)",
          icon: "✔",
          bg: "success",
        });
      }
    } catch (error) {
      console.log(error);
      setToast({
        toastShow: true,
        title: "Failed to upload",
        content: "Please try again later",
        icon: "❌",
        bg: "warning",
      });
    }
  };

  return (
    <div className="user_bio_container">
      <div className="user_bio_title">Setting</div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="information" title="General Information">
          <BioForm updatedProfile={updatedProfile} {...userInfo} />
        </Tab>
        <Tab eventKey="password" title="Change Password">
          <PasswordForm handleChangePassword={handleChangePassword} />
        </Tab>
        <Tab eventKey="avatar" title="User Avatar">
          <div className="user_bio_image_container">
            <div
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#999",
                textAlign: "left",
              }}
              className="user_bio_image_title"
            >
              Profile Image
              <label
                style={{ marginLeft: "40px" }}
                onClick={handleUpdateAvatar}
                className="btn btn-primary "
              >
                Save Change
              </label>
            </div>

            <div className="user_bio_image">
              <img
                src={
                  !uploadedImage
                    ? userInfo.userImage.includes("http")
                      ? userInfo.userImage
                      : `${USER_IMAGE_BASE_URL}/${userInfo.userImage}`
                    : URL.createObjectURL(uploadedImage)
                }
                alt={userInfo.userName}
              />
              <input
                onChange={(e) => setUploadedImage(e.target.files[0])}
                type="file"
                ref={imgRef}
                className="d-none"
              />

              <div
                onClick={(e) => {
                  console.log(imgRef.current.click());
                }}
                className="img_uploader"
                for="userImageInput"
              >
                <i className="fas fa-upload"></i>
              </div>
              {/* <div>
                <p style={{ fontSize: "20px", fontWeight: "500" }}>
                  {userInfo.userName}
                </p>
                <p
                  style={{ fontSize: "16px", fontWeight: "400", color: "#999" }}
                >
                  {userInfo.userType === 0 ? "Admin" : "User"}
                </p>
              </div> */}
            </div>
          </div>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled></Tab>
      </Tabs>
    </div>
  );
}

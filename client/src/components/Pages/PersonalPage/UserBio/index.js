import { Tabs } from "antd";
import messageAntd, { messageTypes } from "components/Common/Toast/message";
import { GoalDataForm, PersonalDataForm } from "components/Form";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../../../api/userApi";
import { USER_IMAGE_BASE_URL } from "../../../../assets/constants";
import authSlice from "../../../../redux/slices/authSlice";
import BioForm from "./BioForm";
import PasswordForm from "./PasswordForm";
import "./style.scss";
const { TabPane } = Tabs;
export default function UserBio() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const imgRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [key, setKey] = useState("information");

  const handleUpdateAvatar = async (e) => {
    try {
      const formData = new FormData();
      formData.append("userImage", uploadedImage);
      const res = await userApi.updateAvatar(formData);
      if (res.data.isSuccess) {
        messageAntd(messageTypes.success, "Upload successfully ");
        return dispatch(authSlice.actions.setUserAvatar(uploadedImage.name));
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400)
        messageAntd(messageTypes.error, "Please try again later ");
    }
  };
  const updatedProfile = async (values) => {
    try {
      const data = { ...values };
      delete data.userConfirmPassword;
      const res = await userApi.updateProfile(data);
      if (res.data.isSuccess) {
        messageAntd(messageTypes.success, "Update successfully ");
        return dispatch(authSlice.actions.setUserProfile(res.data.updatedUser));
      }
    } catch (error) {
      console.log(error);
      messageAntd(messageTypes.error, "Please try again later ");
    }
  };
  const handleChangePassword = async (values) => {
    try {
      const res = await userApi.updatePassword(values.userPassword);
      if (res.data.isSuccess)
        messageAntd(messageTypes.success, "Update successfully ");
    } catch (error) {
      console.log(error);
      messageAntd(messageTypes.error, "Please try again later ");
    }
  };

  return (
    <div className="user_bio_container">
      {/* <div className="user_bio_title">Setting</div> */}
      <Tabs
        id="controlled-tab-example"
        defaultActiveKey={key}
        onChange={(key) => setKey(key)}
        className="mb-3"
      >
        <TabPane key="information" tab="General Information">
          <BioForm updatedProfile={updatedProfile} {...userInfo} />
        </TabPane>
        <TabPane key="password" tab="Change Password">
          <PasswordForm handleChangePassword={handleChangePassword} />
        </TabPane>
        <TabPane key="avatar" tab="User Avatar">
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
                onClick={() => imgRef.current.click()}
                className="img_uploader"
                for="userImageInput"
              >
                <i className="fas fa-upload"></i>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane key="tracking" tab="Tracking">
          <Formik>
            {(formikProps) => (
              <>
                <PersonalDataForm />
                <GoalDataForm />
              </>
            )}
          </Formik>
        </TabPane>
      </Tabs>
    </div>
  );
}

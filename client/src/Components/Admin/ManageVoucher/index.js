import React, { useContext } from "react";
import "./style.scss";
import VoucherForm from "./VoucherForm";
import { useSelector } from "react-redux";
import vouApi from "../../../api/vouApi";
import { Context } from "../../../Contexts";
export default function Voucher() {
  const listCate = useSelector((state) => state.cateReducer);
  const { setToast } = useContext(Context);

  //HANDLE ADD VOUCHER
  const handleAddVoucher = async (voucher) => {
    try {
      setToast({
        toastShow: true,
        title: "Adding ...",
        content: "Please wait a second",
        icon: "👀",
        bg: "info",
      });
      const res = await vouApi.addVoucher({
        ...voucher,
        vouExpired: voucher.vouExpired,
      });
      if (res.data.isSuccess)
        return setToast({
          toastShow: true,
          title: "Adding successfully !!!",
          content: "Happy Shopping :)",
          icon: "✔",
          bg: "success",
        });
    } catch (error) {
      console.log({ error });
      setToast({
        toastShow: true,
        title: "Failed !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
    }
  };
  return (
    <div className="voucher_container">
      <div className="voucher_form">
        <div className="voucher_form_title">VOUCHER GENERATOR </div>
        <VoucherForm handleAddVoucher={handleAddVoucher} listCate={listCate} />
      </div>
    </div>
  );
}

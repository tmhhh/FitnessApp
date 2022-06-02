import messageAntd, { messageTypes } from "Components/Common/Toast/message";
import React from "react";
import { useSelector } from "react-redux";
import vouApi from "../../../api/vouApi";
import "./style.scss";
import VoucherForm from "./VoucherForm";
export default function Voucher() {
  const listCate = useSelector((state) => state.cateReducer);

  //HANDLE ADD VOUCHER
  const handleAddVoucher = async (voucher) => {
    try {
      messageAntd(messageTypes.loading, "Please wait a second ");
      const res = await vouApi.addVoucher({
        ...voucher,
        vouExpired: voucher.vouExpired,
      });
      if (res.data.isSuccess) return;
      messageAntd(messageTypes.success, "Add successfully !!!");
    } catch (error) {
      console.log({ error });
      messageAntd(messageTypes.error, "Please try again later !!!");
    }
  };
  return (
    <div className="voucher_container">
      <div className="voucher_form common-float">
        <div className="voucher_form_title">VOUCHER GENERATOR </div>
        <VoucherForm handleAddVoucher={handleAddVoucher} listCate={listCate} />
      </div>
    </div>
  );
}

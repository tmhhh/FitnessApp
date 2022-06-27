const vouModel = require("../models/voucher.model");
const userModel = require("../models/user.model");
const nodemailer = require("../utils/nodemailer");
// const checkVoucherUse = (vouCateType, userCart) => {
//   const userCart.find(e=>e.product.prodType)
// };
module.exports = {
  addingVou: async (req, res) => {
    try {
      const newVoucher = { ...req.body };
      const listUsers = userModel.find().select("-userPassword");
      const addedVou = vouModel.create(newVoucher);
      const listPromises = await Promise.all([addedVou, listUsers]);
      //SEND MAIL TO USERS
      await nodemailer.discountNoti(listPromises[1], listPromises[0]);
      return res
        .status(200)
        .json({ isSuccess: true, addedVou: listPromises[0] });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  verifyVoucher: async (req, res) => {
    try {
      const { vouCode } = req.query;
      const result = await Promise.all([
        userModel
          .findById(req.userID)
          .select("-userPassword")
          .populate("userCart.product"),
        vouModel.findOne({ vouCode }).select("-vouQuantity"),
      ]);
      const [foundUser, foundVoucher] = result;
      if (!foundVoucher)
        return res
          .status(403)
          .json({ isSuccess: false, message: "Code is not valid" });
      return res.status(200).json({ isSuccess: true, voucher: foundVoucher });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
};

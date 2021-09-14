const vouModel = require("../models/voucher.model");
const userModel = require("../models/user.model");

// const checkVoucherUse = (vouCateType, userCart) => {
//   const userCart.find(e=>e.product.prodType)
// };
module.exports = {
  addingVou: async (req, res) => {
    try {
      const newVoucher = { ...req.body };
      const addedVou = await vouModel.create(newVoucher);
      return res.status(200).json({ isSuccess: true, addedVou });
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
        vouModel.findOne({ vouCode }).populate("cateID").select("-vouQuantity"),
      ]);
      const [foundUser, foundVoucher] = result;
      console.log(foundVoucher);
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

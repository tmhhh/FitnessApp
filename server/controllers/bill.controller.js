const billModel = require("../models/bill.model");
const calTotalPrice = require("../utils/cartUtils");
module.exports = {
  billCheckOut: async (req, res) => {
    try {
      const addedBill = {
        ...req.body,
        user: req.userID,
        shippingAddress: {
          province: req.body.province,
          district: req.body.district,
          ward: req.body.ward,
        },
        totalPrice: calTotalPrice(req.body.listItems, 20, 10),
      };
      const check = await billModel.create(addedBill);
      return res.status(200).json({ isSuccess: true, addedBill });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
};

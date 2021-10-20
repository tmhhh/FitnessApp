const billModel = require("../models/bill.model");
const { calTotalPrice, calSubTotal } = require("../utils/cartUtils");
const vouModel = require("../models/voucher.model");
const userModel = require("../models/user.model");
module.exports = {
  billCheckOut: async (req, res) => {
    //2nd WAY GET CART FROM USER'S POST REQUEST
    const { listItems, shippingFee, discountUsedID } = req.body;
    const foundVou = await vouModel.findById(discountUsedID);
    try {
      const addedBill = {
        ...req.body,
        user: req.userID,
        shippingAddress: {
          province: req.body.province,
          district: req.body.district,
          ward: req.body.ward,
        },
        price: {
          totalPrice: calTotalPrice(
            listItems,
            foundVou ? foundVou.vouDiscount : 0,
            shippingFee
          ),
          subTotal: calSubTotal(listItems),
          shippingFee,
          discount: foundVou ? foundVou.vouDiscount : 0,
        },
        discountUsed: discountUsedID,
      };
      const billCheckout = billModel.create(addedBill);
      const foundUser = userModel.findById(req.userID).populate({
        path: "userCart.product",
        populate: {
          path: "prodCategory.cateName",
        },
      });
      const listRes = await Promise.all([billCheckout, foundUser]);

      //UPDATE USER CART
      for (const prod of listRes[1].userCart) {
        for (const item of listItems) {
          if (prod.product._id.toString() === item.product._id.toString()) {
            prod.isOrdered = true;
            prod.isSelected = false;
          }
        }
      }
      // console.log(listRes[1].userCart);
      let updatedCart = await listRes[1].save();
      updatedCart = updatedCart.toObject();
      console.log({ updatedCart });
      //FIND PRODUCT FILTER NAME
      for (const prod of updatedCart.userCart) {
        for (const filter of prod.product.prodCategory.cateName.cateFilter) {
          if (
            filter._id.toString() ===
            prod.product.prodCategory.cateFilter._id.toString()
          ) {
            prod.product.prodCategory.cateFilter.filterName = filter.filterName;
          }
        }
      }

      //REMOVE CATE FIlTER PROPERTIES IN CATE NAME OF PRODUCT
      for (const prod of updatedCart.userCart) {
        delete prod.product.prodCategory.cateName.cateFilter;
      }
      // console.log(updatedCart.userCart[0]);
      return res.status(200).json({
        isSuccess: true,
        addedBill,
        updatedCart: updatedCart.userCart,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
};

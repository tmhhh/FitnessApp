const billModel = require("../models/bill.model");
const { calTotalPrice, calSubTotal } = require("../utils/cartUtils");
const vouModel = require("../models/voucher.model");
const userModel = require("../models/user.model");
const nodemailer = require("../utils//nodemailer");
const productModel = require("../models/product.model");

const calRevenueByMonth = (listRevenues, month) =>
  listRevenues.reduce((sum, current) => {
    if (current.createdAt.getMonth() + 1 === month)
      return sum + current.price.totalPrice;
    return sum;
  }, 0);

module.exports = {
  billCheckOut: async (req, res) => {
    try {
      //2nd WAY GET CART FROM USER'S POST REQUEST ( prefer 1st way *get cart from database)
      const { listItems, shippingFee, discountUsedID } = req.body;
      const foundVou = await vouModel.findById(discountUsedID);

      //TOTAL PRICE
      const totalPrice = calTotalPrice(
        listItems,
        foundVou ? foundVou.vouDiscount : 0,
        shippingFee
      );
      console.log({ totalPrice, shippingFee });
      const addedBill = {
        ...req.body,
        user: req.userID,
        shippingAddress: {
          province: req.body.province,
          district: req.body.district,
          ward: req.body.ward,
        },
        price: {
          totalPrice,
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

      let listRes = await Promise.all([billCheckout, foundUser]);

      //UPDATE BOUGHT PRODUCT QUANTITY
      const listUpdateProds = [];
      for (const item of listItems) {
        listUpdateProds.push(
          productModel.findByIdAndUpdate(
            item.product._id,
            {
              $inc: { prodQuantity: -item.quantity },
            },
            { new: true }
          )
        );
      }
      console.log({ listUpdateProds });
      //SEND MAIL CONFIRM ORDER TO BUYER
      const sendedEmail = nodemailer.billConfirm(
        listRes[1].userEmail,
        addedBill,
        listRes[0]._id
      );

      //UPDATE USER CART (ordered item: isOrdered => true)
      for (const prod of listRes[1].userCart) {
        for (const item of listItems) {
          if (prod.product._id.toString() === item.product._id.toString()) {
            prod.isOrdered = true;
            prod.isSelected = false;
          }
        }
      }
      // console.log(listRes[1].userCart);
      let updatedCart = listRes[1].save();

      let secondListRes = await Promise.all([
        sendedEmail,
        updatedCart,
        ...listUpdateProds,
      ]);
      secondListRes[1] = secondListRes[1].toObject();
      // console.log({ secondListRes[1] });
      //FIND PRODUCT FILTER NAME
      for (const prod of secondListRes[1].userCart) {
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
      for (const prod of secondListRes[1].userCart) {
        delete prod.product.prodCategory.cateName.cateFilter;
      }
      // console.log(secondListRes[1].userCart[0]);
      return res.status(200).json({
        isSuccess: true,
        addedBill,
        updatedCart: secondListRes[1].userCart,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  // getTotalNumbBills: async (req, res) => {
  //   try {
  //     const totalNumbBills = await billModel.count();
  //     return res.status(200).json({ isSuccess: true, totalNumbBills });
  //   } catch (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .json({ isSuccess: false, message: "Server Internal Error" });
  //   }
  // },
  getTotalRevenueByYear: async (req, res) => {
    try {
      const { year } = req.query;
      const foundBills = await billModel
        .find({
          createdAt: {
            $gte: new Date(+year, 0, 1),
            $lte: new Date(+year, 11, 31),
          },
        })
        .lean()
        .populate("user listItems.product");
      const yearRevenue = [...Array(12).keys()].map((e) =>
        calRevenueByMonth(foundBills, +e + 1)
      );

      let checkedID = [];
      /// TOP CUSTOMER
      let customers = [];
      for (let i = 0; i < foundBills.length; i++) {
        if (
          checkedID.every(
            (e) => e.toString() !== foundBills[i].user._id.toString()
          )
        ) {
          checkedID.push(foundBills[i].user._id);
          let totalSpend = 0;
          for (let j = 0; j < foundBills.length; j++) {
            if (
              foundBills[j].user._id.toString() ===
              foundBills[i].user._id.toString()
            ) {
              totalSpend += foundBills[j].price.totalPrice;
            }
          }
          customers.push({
            user: foundBills[i].user,
            totalSpend,
          });
        }
      }
      customers.sort((a, b) => b.totalSpend - a.totalSpend);
      const topCustomers = customers.filter((e, index) => {
        if (index < 3) return true;
      });

      //TOP PRODUCTS
      let topProds = [];
      for (const bill of foundBills) {
        for (const item of bill.listItems) {
          if (
            !checkedID.some((e) => e.toString() === item.product._id.toString())
          ) {
            checkedID.push(item.product._id);
            topProds.push({
              product: item.product,
              quantity: item.quantity,
            });
          } else {
            topProds.forEach((e) => {
              if (e.product._id.toString() === item.product._id.toString())
                e.quantity += item.quantity;
            });
          }
        }
      }
      topProds.sort((a, b) => b.quantity - a.quantity);
      topProds = topProds.filter((e, index) => {
        if (index < 3) return true;
      });
      // console.log(topProds);
      return res.json({ isSuccess: true, yearRevenue, topCustomers, topProds });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
};

const productModel = require("../models/product.model");
const cateModel = require("../models/cate.model");
const { getQueryOptions } = require("../utils/queryOptions");
module.exports = {
  getAllProducts: async (req, res) => {
    const { skipItem, pageSize } = getQueryOptions(req.query);
    try {
      const totalPages = Math.ceil((await productModel.count()) / pageSize);

      const listProducts = await productModel
        .find()
        .skip(skipItem)
        .limit(pageSize)
        .populate("prodCategory.cateName");
      for (const prod of listProducts) {
        for (const filter of prod.prodCategory.cateName.cateFilter) {
          if (
            filter._id.toString() === prod.prodCategory.cateFilter._id &&
            prod.prodCategory.cateFilter._id.toString()
          ) {
            prod.prodCategory.cateFilter.filterName = filter.filterName;
          }
        }
      }

      //REMOVE CATE FIlTER PROPERTIES IN CATE NAME OF PRODUCT
      for (const prod of listProducts) {
        delete prod.prodCategory.cateName.cateFilter;
      }
      return res
        .status(200)
        .json({ isSuccess: true, listProducts, totalPages });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  create: async (req, res) => {
    const { prodCateFilter, ...product } = req.body;
    console.log(req.body);
    try {
      const newProduct = new productModel({
        ...product,
        prodCategory: {
          cateName: req.body.prodCategory,
          cateFilter: { _id: prodCateFilter },
        },
        prodThumbnail:
          req.files.thumbnailFile?.length > 0
            ? req.files.thumbnailFile[0].filename
            : "default-product.png",
        prodImages: req.files.imagesFile?.map((img) => img.filename),
      });
      await newProduct.save();
      return res.status(200).json({ isSuccess: true, newProduct });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    let product = { ...req.body };
    if (req.files.thumbnailFile?.length > 0) {
      product["prodThumbnail"] = req.files.thumbnailFile[0].filename;
    }
    if (req.files.imagesFile?.length > 0) {
      product["prodImages"] = req.files.imagesFile.map(
        (image) => image.filename
      );
    }

    try {
      product = {
        ...product,
        prodCategory: {
          cateName: product.prodCategory,
          cateFilter: {
            _id: product.prodCateFilter,
          },
        },
        prodQuantity: +product.prodQuantity,
        prodDiscount: JSON.parse(product.prodDiscount),
        prodRating: JSON.parse(product.prodRating),
      };
      console.log({ product });
      await productModel.updateOne({ _id: req.params.id }, product);
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    try {
      await productModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  searchProducts: async (req, res) => {
    try {
      const { prodName } = req.query;
      const foundProd = await productModel.find({
        prodName: { $regex: ".*" + prodName.toUpperCase() + ".*" },
      });
      return res.status(200).json({ isSuccess: true, foundProd });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  getTotalNumbProds: async (req, res) => {
    try {
      const listProds = await productModel
        .find()
        .populate("prodCategory.cateName");
      const totalNumbProds = listProds.length;

      //GET PRODUCT FILTERED BY CATEGORY (IN %)
      const prodNumbByCate = {
        supplement: 0,
        equipment: 0,
        cloth: 0,
      };
      for (const prod of listProds) {
        // console.log(prodNumbByCate);
        if (prod.prodCategory.cateName.cateName === "Supplement") {
          prodNumbByCate.supplement += 1;
        } else if (prod.prodCategory.cateName.cateName === "Equipment") {
          prodNumbByCate.equipment += 1;
        } else prodNumbByCate.cloth += 1;
      }
      const prodPercentByCate = [
        (prodNumbByCate.supplement / totalNumbProds) * 100,
        (prodNumbByCate.equipment / totalNumbProds) * 100,
        (prodNumbByCate.cloth / totalNumbProds) * 100,
      ];

      //GET TOP 5 FAVORITE PRODUCTS
      listProds.sort(
        (a, b) => b.prodRating.favorite_count - a.prodRating.favorite_count
      );

      const favoriteProds = listProds.filter((e, index) => index < 5);

      return res.status(200).json({
        isSuccess: true,
        totalNumbProds,
        prodPercentByCate,
        favoriteProds,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
  addDiscount: async (req, res) => {
    try {
      const { prodID, discountPercent, startDate } = req.body;
      console.log(startDate, discountPercent);
      const updatedProd = await productModel.findByIdAndUpdate(
        prodID,
        {
          "prodDiscount.startDate": startDate,
          "prodDiscount.isDiscounted": true,
          "prodDiscount.discountPercent": discountPercent,
        },
        { new: true }
      );
      return res.status(200).json({ isSuccess: true, updatedProd });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
  resetDiscount: async (req, res) => {
    try {
      const { prodID } = req.body;
      console.log(prodID);
      const updatedProd = await productModel.findByIdAndUpdate(
        prodID,
        {
          "prodDiscount.startDate": null,
          "prodDiscount.isDiscounted": false,
          "prodDiscount.discountPercent": "0",
        },
        { new: true }
      );
      return res.status(200).json({ isSuccess: true, updatedProd });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
};

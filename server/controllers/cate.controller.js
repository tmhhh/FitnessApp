const cateModel = require("../models/cate.model");

module.exports = {
  addingCate: async (req, res) => {
    try {
      const newCate = { ...req.body };
      const addedCate = await cateModel.create(newCate);
      return res.status(200).json({ isSuccess: true, addedCate });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  getAllCate: async (req, res) => {
    try {
      const listCate = await cateModel.find();
      return res.status(200).json({ isSuccess: true, listCate });
    } catch (err) {
      return res.status(500).json({ isSuccess: false, err });
    }
  },
};

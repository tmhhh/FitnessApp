const cateModel = require("../models/cate.model");

module.exports = {
  updatingCate: async (req, res) => {
    try {
      const { updatingCate } = req.body;
      console.log({ updatingCate });
      const updatedCate = await cateModel.findOneAndUpdate(
        { _id: updatingCate._id },
        updatingCate,
        { new: true }
      );
      if (!updatedCate)
        return res
          .status(403)
          .json({ isSuccess: false, message: "Category ID is not valid" });
      return res.status(200).json({ isSuccess: true, updatedCate });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  deletingCate: async (req, res) => {
    try {
      const { cateID } = req.params;
      console.log({ cateID });
      const deletedCate = await cateModel.findByIdAndDelete(cateID);
      if (!deletedCate)
        return res
          .status(403)
          .json({ isSuccess: false, message: "Category id is not valid" });
      return res
        .status(200)
        .json({ isSuccess: true, deletedCateID: deletedCate._id });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ isSuccess: false, err });
    }
  },
  addingCate: async (req, res) => {
    try {
      const newCate = { ...req.body };
      const addedCate = await cateModel.create(newCate);
      console.log({ addedCate });
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

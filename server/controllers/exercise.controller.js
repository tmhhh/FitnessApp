const exerciseModel = require("../models/exercise.model");

module.exports = {
  getAll: async (req, res) => {
    try {
      const listExercises = await exerciseModel.find();
      return res.status(200).json({ isSuccess: true, listExercises });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal Server Error" });
    }
  },
  addExercise: async (req, res) => {
    try {
      const exercise = { ...req.body };
      const addedExercise = await exerciseModel.create(exercise);
      return res.status(200).json({ isSuccess: true, addedExercise });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal Server Error" });
    }
  },
  updateExercise: async (req, res) => {
    try {
      const exercise = { ...req.body };
      const updatedExercise = await exerciseModel.findByIdAndUpdate(
        exercise._id,
        exercise
      );
      return res.status(200).json({ isSuccess: true, updatedExercise });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal Server Error" });
    }
  },
  deleteExercise: async (req, res) => {
    try {
      const { id } = req.body;
      const deletedExercise = await exerciseModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ isSuccess: true, deletedID: deletedExercise._id });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal Server Error" });
    }
  },
};

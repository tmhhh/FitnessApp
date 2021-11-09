const express = require("express");
const router = express.Router();
const exerciseCtl = require("../controllers/exercise.controller");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyTokenMdw = require("../middlewares/verifyToken.mdw");
router.get("/", exerciseCtl.getAll);

//CRUD
router.post("/add", verifyTokenMdw, verifyAdmin, exerciseCtl.addExercise);
router.put("/update", verifyTokenMdw, verifyAdmin, exerciseCtl.updateExercise);
router.delete(
  "/delete",
  verifyTokenMdw,
  verifyAdmin,
  exerciseCtl.deleteExercise
);

module.exports = router;

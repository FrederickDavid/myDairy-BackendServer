const express = require("express");
const router = express.Router();
const { image } = require("../utils/multer");
const {
  getAllDiary,
  getDiary,
  createDiary,
  deleteDiary,
  updateDiary,
} = require("../controller/diaryController");

router.route("/:id").get(getAllDiary);
router.route("/:id/createDiary").post(image, createDiary);
router
  .route("/:id/:diary")
  .get(getDiary)
  .patch(image, updateDiary)
  .delete(deleteDiary);

module.exports = router;

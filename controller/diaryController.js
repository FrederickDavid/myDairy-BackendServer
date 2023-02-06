const userModel = require("../model/userModel");
const diaryModel = require("../model/diaryModel");
const mongoose = require("mongoose");

const getAllDiary = async (req, res) => {
  try {
    const getAllDiary = await userModel
      .findById(req.params.id)
      .populate("diary")
      .sort({ word: "asc" });

    res.status(200).json({
      message: "All Diary Found Successfully",
      data: getAllDiary,
    });
  } catch (error) {
    res.status(404).json({
      message: "No Diary Found in this Database",
      error: error.message,
    });
  }
};

const getDiary = async (req, res) => {
  try {
    const getDiary = await diaryModel.findById(req.params.diary);

    res.status(200).json({
      message: "Diary Found Successfully",
      data: getDiary,
    });
  } catch (error) {
    res.status(404).json({
      message: "No Diary with such ID in this Database",
      error: error.message,
    });
  }
};

const createDiary = async (req, res) => {
  try {
    // const image = await cloudinary.uploader.upload(req.file.path);
    const { title, word } = req.body;

    const getUser = await userModel.findById(req.params.id);
    const diaryContent = new diaryModel({
      title,
      word,
      avatar: req.file.path,
      // avatar: image.secure_url,
      // avatarID: image.public_id,
    });

    diaryContent.user = getUser;
    diaryContent.save();

    getUser.diary.push(mongoose.Types.ObjectId(diaryContent._id));
    getUser.save();

    res.status(201).json({
      message: "Diary Created Successfully",
      data: diaryContent,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to Create Diary",
      error: error.message,
    });
  }
};

const deleteDiary = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id);

    const deleteDiary = await diaryModel.findByIdAndDelete(req.params.diary);

    getUser.diary.pull(deleteDiary);
    getUser.save();

    res.status(200).json({
      message: "Diary Deleted Successfully",
      data: getUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to Delete Diary",
      error: error.message,
    });
  }
};

const updateDiary = async (req, res) => {
  try {
    // await cloudinary.uploader.destroy(user.avatarID);
    // const image = await cloudinary.uploader.upload(req.file.path);
    const { title, word } = req.body;

    const updateDiary = await diaryModel.findByIdAndUpdate(
      req.params.diaryID,
      {
        title,
        word,
        avatar: req.file.path,
        // avatar: image.secure_url,
        // avatarID: image.public_id
      },
      { new: true }
    );
    res.status(201).json({
      message: "Diary Updated Successfully",
      data: updateDiary,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to Update Diary",
      error: error.message,
    });
  }
};

module.exports = {
  getAllDiary,
  getDiary,
  createDiary,
  deleteDiary,
  updateDiary,
};

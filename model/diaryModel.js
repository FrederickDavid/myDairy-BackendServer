const mongoose = require("mongoose");

const diaryModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("diarys", diaryModel);

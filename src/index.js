const express = require("express");
require("../utils/db");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Dairy Api Created Succesfully",
  });
});

app.use("/api/user", require("../router/userRouter"));
app.use("/api/diary", require("../router/diaryRouter"));

app.listen(port, () => {
  console.log(`Server is listening to PORT: ${port}`);
});

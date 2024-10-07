require("dotenv").config();

const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsConfig");
const {
  generateImageController,
} = require("./controllers/generateImageController");
const { registerController } = require("./controllers/registerController");
const loginController = require("./controllers/loginController");

const app = express();
app.use(express.json());

app.use(cors(corsOptions));

app.post("/generate-image", generateImageController);

app.post("/register", registerController);
app.post("/login", loginController);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

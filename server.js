require("dotenv").config();

const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsConfig");
const {
  generateImageController,
} = require("./controllers/generateImageController");
const { registerController } = require("./controllers/registerController");
const signinController = require("./controllers/signinController");
const saveImageController = require("./controllers/saveImageController");
const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(cors(corsOptions));

app.post("/register", registerController);
app.post("/signin", signinController);
app.post("/generate-image", generateImageController);
app.post("/save-image", saveImageController);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

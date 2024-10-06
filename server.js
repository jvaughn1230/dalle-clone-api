require("dotenv").config();

const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsConfig");
const { Model } = require("clarifai-nodejs");

const modelUrl = "https://clarifai.com/openai/dall-e/models/dall-e-3";

const model = new Model({
  url: modelUrl,
  authConfig: { pat: process.env.CLARIFAI_PAT },
});

const inputText = Buffer.from("floor plan for 2 bedroom kitchen house");

const generateImage = async (req, res) => {
  const { inputText } = req.body;
  try {
    const inputBuffer = Buffer.from(inputText, "utf-8");
    const modelPrediction = await model.predictByBytes({
      inputBytes: inputBuffer,
      inputType: "text",
    });

    const outputBase64 = modelPrediction?.[0]?.data?.image?.base64 ?? "";
    res.json({ imageBase64: outputBase64 });
  } catch (err) {
    console.error("Error during prediction:", err);
    res.status(500).json({ error: "Failed to generate image" });
  }
};

const app = express();
app.use(express.json());

app.use(cors(corsOptions));

app.post("/generate-image", generateImage);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

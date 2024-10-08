const { Model } = require("clarifai-nodejs");
const cloudinary = require("../config/cloudinaryConfig");
const db = require("../config/dbConfig");

const model = new Model({
  url: process.env.CLARIFAI_MODEL_URL,
  authConfig: { pat: process.env.CLARIFAI_PAT },
});

const generateImageController = async (req, res) => {
  console.log("generate started");
  console.log(req.body);

  const { inputText, id } = req.body;
  try {
    const inputBuffer = Buffer.from(inputText, "utf-8");
    const modelPrediction = await model.predictByBytes({
      inputBytes: inputBuffer,
      inputType: "text",
    });

    const outputBase64 = modelPrediction?.[0]?.data?.image?.base64 ?? "";

    console.log("done");

    res.json({ imageBase64: outputBase64 });
  } catch (err) {
    console.error("Error during prediction:", err);
    res.status(500).json({ error: "Failed to generate image" });
  } finally {
    console.log("incrementing");
    db.where("id", "=", id).increment("entries", 1).returning("entries");
    console.log("updated!");
  }
};

module.exports = {
  generateImageController,
};

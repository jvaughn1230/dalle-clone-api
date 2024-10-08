const { Model } = require("clarifai-nodejs");

const modelUrl = "https://clarifai.com/openai/dall-e/models/dall-e-3";

const model = new Model({
  url: modelUrl,
  authConfig: { pat: "57025a4e5bdd415283fa0020429168b1" },
});

const inputText = Buffer.from("floor plan for 2 bedroom kitchen house");

async () => {
  try {
    const modelPrediction = await model.predictByBytes({
      inputBytes: inputText,
      inputType: "text",
    });

    const outputBase64 = modelPrediction?.[0]?.data?.image?.base64 ?? "";
    console.log("Image saved as image.png");
    res.json({ imageBase64: outputBase64 });
    console.log("Yay image sent");

    // fs.writeFileSync("image.png", outputBase64, "base64");
  } catch (err) {
    console.error("Error during prediction:", err);
    res.status(500).json({ error: "Failed to generate image" });
  }
};

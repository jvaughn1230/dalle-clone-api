const cloudinaryDB = require("cloudinary").v2;
const db = require("../config/dbConfig");

const saveImage = async (req, res) => {
  const { userId, image, isPublic } = req.body;

  try {
    const uploadResult = await cloudinaryDB.uploader.upload(image);

    const imageUrl = uploadResult.secure_url;

    await db("images").insert({
      url: imageUrl,
      public: isPublic,
      userId: userId,
      saved: new Date(),
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error Storing Image", error);
    res.status(500).json({ success: false, error: "Image upload failed" });
  }
};

module.exports = saveImage;

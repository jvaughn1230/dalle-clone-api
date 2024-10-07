const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");

const logincontroller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginData = await db("login").where({ email }).select("hash").first();

    if (!loginData) {
      return res.status(400).json("Invalid Credentials");
    }

    const isValid = await bcrypt.compare(password, loginData.hash);

    if (isValid) {
      const user = await db("users").where({ email }).select("*").first();

      if (user) {
        res.json(user);
      } else {
        res.status(400).json("User not found");
      }
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json("Internal server error");
  }
};

module.exports = logincontroller;

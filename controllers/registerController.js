const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { email, name, password } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await db.transaction(async (trx) => {
    const user = await trx("users").returning("*").insert({
      email: email,
      name: name,
      joined: new Date(),
    });

    await trx("login")
      .insert({
        hash: hashedPassword,
        email: email,
      })
      .returning("email");

    res.json(user[0]);
  });
};

module.exports = {
  registerController,
};

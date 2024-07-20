require("dotenv").config();
const { User } = require("../database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (datos) => {
  const { id, name, email, password, role } = datos;
  if (!name || !email || !password || !role) {
    return "Faltan datos";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    id,
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = jwt.sign(
    { id: newUser.id, role: newUser.role },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  return { newUser, token };
};

const loginUser = async (datos) => {
  const { email, password } = datos;
  if (!email || !password) {
    return "Faltan datos";
  }

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return "Usuario o contraseña incorrectos";
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return "Usuario o contraseña incorrectos";
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  return { user, token };
};

module.exports = {
  createUser,
  loginUser,
};

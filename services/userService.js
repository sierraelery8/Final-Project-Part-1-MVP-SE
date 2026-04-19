const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/User");

async function registerUser({ email, password, role }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    const err = new Error("Email already in use");
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    passwordHash,
    role: role || "user",
  });

  return user;
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user, token };
}

module.exports = { registerUser, loginUser };

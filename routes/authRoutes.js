const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../services/userService");
const validateRequest = require("../middleware/validateRequest");
const { registerSchema, loginSchema } = require("../validation/authSchemas");
const { requireAuth } = require("../middleware/authMiddleware");
const User = require("../database/User");

// REGISTER
router.post(
  "/register",
  validateRequest(registerSchema),
  async (req, res, next) => {
    try {
      const user = await registerUser(req.body);
      res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      next(err);
    }
  }
);

// LOGIN
router.post(
  "/login",
  validateRequest(loginSchema),
  async (req, res, next) => {
    try {
      const { user, token } = await loginUser(req.body);
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// CURRENT USER
router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "role"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// LOGOUT
router.post("/logout", requireAuth, (req, res) => {
  res.json({ message: "Logged out" });
});

module.exports = router;

const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/authMiddleware");
const CareLog = require("../database/CareLog");

// Protect all carelog routes
router.use(requireAuth);

// POST /carelogs/:plantId
router.post("/:plantId", async (req, res, next) => {
  try {
    const { action, notes } = req.body;

    const log = await CareLog.create({
      plantId: req.params.plantId,
      action,
      notes,
    });

    res.status(201).json(log);
  } catch (err) {
    next(err);
  }
});

// GET /carelogs/:plantId
router.get("/:plantId", async (req, res, next) => {
  try {
    const logs = await CareLog.findAll({
      where: { plantId: req.params.plantId },
    });

    res.status(200).json(logs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

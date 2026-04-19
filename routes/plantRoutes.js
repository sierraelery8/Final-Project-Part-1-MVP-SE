const express = require("express");
const router = express.Router();

const plantService = require("../services/plantService");
const validateRequest = require("../middleware/validateRequest");
const { createPlantSchema, updatePlantSchema } = require("../validation/plantSchemas");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireOwnerOrAdmin } = require("../middleware/roleMiddleware");

// Protect all routes
router.use(requireAuth);

// GET /plants
router.get("/", async (req, res, next) => {
  try {
    const plants = await plantService.listPlantsForUser(req.user.id, req.query);
    res.json(plants);
  } catch (err) {
    next(err);
  }
});

// GET /plants/:id
router.get("/:id", requireOwnerOrAdmin, async (req, res) => {
  res.json(req.plant);
});

// POST /plants
router.post(
  "/",
  validateRequest(createPlantSchema),
  async (req, res, next) => {
    try {
      const plant = await plantService.createPlant(req.user.id, req.body);
      res.status(201).json(plant);
    } catch (err) {
      next(err);
    }
  }
);

// PUT /plants/:id
router.put(
  "/:id",
  requireOwnerOrAdmin,
  validateRequest(updatePlantSchema),
  async (req, res, next) => {
    try {
      const updated = await plantService.updatePlant(req.plant, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /plants/:id
router.delete("/:id", requireOwnerOrAdmin, async (req, res, next) => {
  try {
    await plantService.deletePlant(req.plant);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const Plant = require("../database/Plant");

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

async function requireOwnerOrAdmin(req, res, next) {
  try {
    const plant = await Plant.findByPk(req.params.id);

    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    if (plant.userId === req.user.id || req.user.role === "admin") {
      req.plant = plant;
      return next();
    }

    return res.status(403).json({ error: "Forbidden" });
  } catch (err) {
    next(err);
  }
}

module.exports = { requireRole, requireOwnerOrAdmin };

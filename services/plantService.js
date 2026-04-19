const Plant = require("../database/Plant");

async function getPlantById(id) {
  return Plant.findByPk(id);
}

async function listPlantsForUser(userId, filters = {}) {
  const where = { userId };

  if (filters.name) where.name = filters.name;
  if (filters.species) where.species = filters.species;

  return Plant.findAll({ where });
}

async function createPlant(userId, data) {
  return Plant.create({ ...data, userId });
}

async function updatePlant(plant, data) {
  const changed = Object.keys(data).some(key => plant[key] !== data[key]);

  if (!changed) {
    const err = new Error("No changes detected");
    err.status = 400;
    throw err;
  }

  return plant.update(data);
}

async function deletePlant(plant) {
  await plant.destroy();
}

module.exports = {
  getPlantById,
  listPlantsForUser,
  createPlant,
  updatePlant,
  deletePlant,
};

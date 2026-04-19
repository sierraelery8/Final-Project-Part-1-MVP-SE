const CareLog = require("../database/CareLog");

async function createCareLog(plantId, data) {
  return CareLog.create({ ...data, plantId });
}

async function getCareLogsForPlant(plantId) {
  return CareLog.findAll({ where: { plantId } });
}

module.exports = { createCareLog, getCareLogsForPlant };

const User = require("./User");
const Plant = require("./Plant");
const CareLog = require("./CareLog");

// USER → PLANTS
User.hasMany(Plant, { foreignKey: "userId" });
Plant.belongsTo(User, { foreignKey: "userId" });

// PLANT → CARELOGS
Plant.hasMany(CareLog, { foreignKey: "plantId" });
CareLog.belongsTo(Plant, { foreignKey: "plantId" });

module.exports = { User, Plant, CareLog };

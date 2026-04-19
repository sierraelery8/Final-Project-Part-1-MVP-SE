const Joi = require("joi");

const createPlantSchema = Joi.object({
  name: Joi.string().required(),
  species: Joi.string().optional(),
  wateringFrequency: Joi.number().integer().min(1).optional(),
});

const updatePlantSchema = Joi.object({
  name: Joi.string().optional(),
  species: Joi.string().optional(),
  wateringFrequency: Joi.number().integer().min(1).optional(),
}).min(1);

module.exports = { createPlantSchema, updatePlantSchema };

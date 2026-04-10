const express = require('express');
const router = express.Router();
const Plant = require('../database/Plant');
const auth = require('../middleware/auth');


// GET all plants
router.get('/', auth, async (req, res) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// GET plant by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const plant = await Plant.findByPk(req.params.id);

    if (!plant) return res.status(404).json({ error: 'Plant not found' });

    if (plant.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this plant' });
    }

    await plant.update(req.body);
    res.json(plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update plant' });
  }
});

// CREATE a plant
router.post('/', async (req, res) => {
  try {
    const plant = await Plant.create(req.body);
    res.status(201).json(plant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plant' });
  }
});

// UPDATE a plant
router.put('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    if (!plant) return res.status(404).json({ error: 'Plant not found' });

    await plant.update(req.body);
    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plant' });
  }
});

// DELETE a plant
router.delete('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    if (plant.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized to delete this plant' });
}

    await plant.destroy();
    res.json({ message: 'Plant deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plant' });
  }
});

module.exports = router;

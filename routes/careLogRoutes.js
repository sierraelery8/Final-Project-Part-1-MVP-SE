const express = require('express');
const router = express.Router();
const CareLog = require('../database/CareLog');
const Plant = require('../database/Plant');
const auth = require('../middleware/auth');

// CREATE a care log
router.post('/', auth, async (req, res) => {
  try {
    const { plantId, action, notes } = req.body;

    // ensure plant exists
    const plant = await Plant.findByPk(plantId);
    if (!plant) return res.status(404).json({ error: 'Plant not found' });

    const log = await CareLog.create({
      plantId,
      userId: req.user.id, // from JWT
      action,
      notes
    });

    res.status(201).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create care log' });
  }
});

// GET all care logs for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const logs = await CareLog.findAll({
      where: { userId: req.user.id }
    });

    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch care logs' });
  }
});

// GET care logs for a specific plant
router.get('/plant/:plantId', auth, async (req, res) => {
  try {
    const logs = await CareLog.findAll({
      where: {
        plantId: req.params.plantId,
        userId: req.user.id
      }
    });

    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch plant logs' });
  }
});

// PUT care logs by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const log = await CareLog.findByPk(req.params.id);

    if (!log) return res.status(404).json({ error: 'Care log not found' });

    if (log.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this care log' });
    }

    await log.update(req.body);
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update care log' });
  }
});


// DELETE a care log
router.delete('/:id', auth, async (req, res) => {
  try {
    const log = await CareLog.findByPk(req.params.id);

    if (!log) return res.status(404).json({ error: 'Care log not found' });

    // ensure user owns the log
    if (log.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this log' });
    }

    await log.destroy();
    res.json({ message: 'Care log deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete care log' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

// GET /plants
router.get('/', (req, res) => {
  res.json({ message: 'Plants route working' });
});

module.exports = router;

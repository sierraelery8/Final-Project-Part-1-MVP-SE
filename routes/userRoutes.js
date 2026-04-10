const express = require('express');
const router = express.Router();
const User = require('../database/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const requireRole = require('../middleware/requireRole');
const auth = require('../middleware/auth');



// register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.create({ username, password });

    res.status(201).json({
      id: user.id,
      username: user.username
    });

  } catch (error) {

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Username already exists' });
    }

    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});


// login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await user.validPassword(password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// delete
router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;

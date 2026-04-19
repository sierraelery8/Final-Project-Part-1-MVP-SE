const sequelize = require('../config/database');
const { User, Plant, CareLog } = require('./index');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    await sequelize.sync({ force: true });

    // create sample users
    const passwordHash = await bcrypt.hash('password123', 10);

    const user1 = await User.create({
      email: 'sierra8@example.com',
      passwordHash,
      role: 'user'
    });

    const admin = await User.create({
      email: 'admin@example.com',
      passwordHash,
      role: 'admin'
    });

    // create sample plants
    const plant1 = await Plant.create({
      name: 'Aloe Vera',
      species: 'Aloe',
      wateringFrequency: 7,
      userId: user1.id
    });

    const plant2 = await Plant.create({
      name: 'Snake Plant',
      species: 'Sansevieria',
      wateringFrequency: 14,
      userId: user1.id
    });

    // create sample care logs
    await CareLog.create({
      plantId: plant1.id,
      action: 'Watered',
      notes: 'Gave 1 cup of water'
    });

    await CareLog.create({
      plantId: plant2.id,
      action: 'Fertilized',
      notes: 'Used succulent fertilizer'
    });

    console.log('🌱 Seeding complete!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();

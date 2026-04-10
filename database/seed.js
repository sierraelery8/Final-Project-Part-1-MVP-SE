const sequelize = require('../config/database');
const User = require('./User');
const Plant = require('./Plant');
const CareLog = require('./CareLog');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // reset all tables
    await sequelize.sync({ force: true });

    // create sample users
    const passwordHash = 'password123';


    const user1 = await User.create({
     username: 'sierra8',
     password: passwordHash,
     role: 'user'
    });


    const user2 = await User.create({
     username: 'admin',
     password: 'password123',
     role: 'admin'
    });

    // create sample plants
    const plant1 = await Plant.create({
      name: 'Aloe Vera',
      species: 'Aloe',
      wateringFrequency: 7
    });

    const plant2 = await Plant.create({
      name: 'Snake Plant',
      species: 'Sansevieria',
      wateringFrequency: 14
    });

    // create sample care logs
    await CareLog.create({
      plantId: plant1.id,
      userId: user1.id,
      action: 'Watered',
      notes: 'Gave 1 cup of water'
    });

    await CareLog.create({
      plantId: plant2.id,
      userId: user1.id,
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

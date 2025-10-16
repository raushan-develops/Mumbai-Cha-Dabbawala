// Simple seed script for meals collection
require('dotenv').config();
const mongoose = require('mongoose');
const Meals = require('./models/Meals');

const DATABASE_URL = process.env.DB_URL;

async function seed() {
  if (!DATABASE_URL) {
    console.error('DB_URL not set in .env');
    process.exit(1);
  }

  await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB');

  const count = await Meals.countDocuments();
  if (count > 0) {
    console.log('Meals collection already has data (count=' + count + '). Exiting.');
    await mongoose.disconnect();
    return;
  }

  const sample = [
    { name: 'Veg Thali', description: 'Assorted vegetarian meal', price: 100, category: '1' },
    { name: 'Non-Veg Thali', description: 'Chicken based meal', price: 150, category: '2' },
    { name: 'Family Pack', description: 'Meal for 4', price: 350, category: '2' },
    { name: 'Special Combo', description: 'Chef special', price: 200, category: '3' }
  ];

  await Meals.insertMany(sample);
  console.log('Inserted sample meals');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

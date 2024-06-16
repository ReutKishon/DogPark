import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config({ path: '../../env' });

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/dogpark';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default db;

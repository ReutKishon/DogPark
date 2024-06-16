// models/Follow.js
import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dog',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

followSchema.index({ user: 1, dog: 1 }, { unique: true }); 

const Follow = mongoose.model('Follow', followSchema);

export default Follow;

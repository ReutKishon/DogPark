import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lifeStage: { type: String, enum: ["Adult", "Puppy"] },
  gender: { type: String, enum: ["Male", "Female"] },
  current_parkId: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Dog = mongoose.model("Dog", dogSchema);

export default Dog;

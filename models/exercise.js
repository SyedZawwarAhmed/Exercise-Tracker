import { model, Schema } from "mongoose";

const exerciseSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
  },
});

export const Exercise = model("Exercise", exerciseSchema);

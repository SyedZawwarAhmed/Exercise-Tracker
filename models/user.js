import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  desription: String,
  duration: Number,
  date: String,
});

export const User = model("User", userSchema);

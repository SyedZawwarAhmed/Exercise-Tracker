import { Router } from "express";
import express from "express";
import { User } from "../models/user.js";
const app = express();
export const userRouter = Router();

userRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const allUsers = await User.find({});
      res.statusCode = 200;
      res.send(allUsers);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { username } = req.body;
      const newUser = new User({ username });
      const response = await newUser.save();
      res.statusCode = 200;
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

userRouter.route("/:_id/exercises").post(async (req, res, next) => {
  try {
    const { description, duration, date } = req.body;
    const user = await User.findById(req.params._id);
    user.description = description;
    user.duration = duration;
    user.date = date;
    const response = await user.save();
    res.statusCode = 200;
    res.send(response);
  } catch (err) {
    next(err);
  }
});

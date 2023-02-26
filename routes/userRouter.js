import { Router } from "express";
import express from "express";
import { User } from "../models/user.js";
import { Exercise } from "../models/exercise.js";
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
    const dateString = date ? new Date(date) : new Date();
    const id = req.params._id;
    const user = await User.findById(id);
    const newExercise = new Exercise({
      username: user.username,
      description,
      duration,
      date: dateString.toDateString(),
      userId: id,
    });
    await newExercise.save();
    res.statusCode = 200;
    res.send({
      _id: id,
      username: newExercise.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.route("/:_id/logs").get(async (req, res, next) => {
  try {
    const logs = await Exercise.find({ userId: req.params._id });
    const username = logs[0].username;
    const count = logs.length;
    const _id = req.params._id;
    const response = {
      username,
      count,
      _id,
      log: logs.map((log) => ({
        description: log.description,
        duration: log.duration,
        date: log.date,
      })),
    };
    res.statusCode = 200;
    res.send(response);
  } catch (err) {
    next(err);
  }
});

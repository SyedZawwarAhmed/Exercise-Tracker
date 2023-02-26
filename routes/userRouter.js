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
    const dateObject = date ? new Date(date) : new Date();
    const id = req.params._id;
    const user = await User.findById(id);
    const newExercise = new Exercise({
      username: user.username,
      description,
      duration,
      date: dateObject,
      userId: id,
    });
    await newExercise.save();
    res.statusCode = 200;
    res.send({
      _id: id,
      username: newExercise.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date.toDateString(),
    });
  } catch (err) {
    next(err);
  }
});

userRouter.route("/:_id/logs/:from?/:to?/:limit?").get(async (req, res, next) => {
  try {

    const logs = await Exercise.find({ userId: req.params._id });
    const filteredLogs = logs.filter((log, index) => {
      if (req.params.from && req.params.to) {
        const from = new Date(req.params.from)
        const to = new Date(req.params.to)
        return log.date >= from && log.date <= to
      } else if (req.params.limit) {
        return index < limit
      } else {
        return true
      }
    })
    const username = logs[0].username;
    const count = logs.length;
    const _id = req.params._id;
    const response = {
      username,
      count,
      _id,
      log: filteredLogs.map((log) => ({
        description: log.description,
        duration: log.duration,
        date: log.date.toDateString(),
      })),
    };
    res.statusCode = 200;
    res.send(response);
  } catch (err) {
    next(err);
  }
});

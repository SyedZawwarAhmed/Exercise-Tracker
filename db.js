import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import pkg from "mongoose";
const { connect, connection } = pkg;

const app = express();
const port = process.env.PORT || 5000;
mongoose.set("strictQuery", false);

// Connection URL
const url = process.env.MONGO_URL;

// Connect to the database
connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

export default connection;

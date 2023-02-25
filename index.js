import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connection from "./db.js";

import { userRouter } from "./routes/userRouter.js";

app.use(cors());
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname });
});

app.use("/api/users", userRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

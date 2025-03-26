import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import classRouter from "./routes/class.route.js";
import announcmentRouter from "./routes/announcment.route.js";
import studentRouter from "./routes/student.route.js";
import lectureRouter from "./routes/lecture.route.js";
import feeRouter from "./routes/fee.route.js";
export const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/announce", announcmentRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/fees", feeRouter);
app.use("/api/v1/lecture", lectureRouter);

app.get("/", (req, res) => {
  console.log(req);
  res.send("Api is working!!")
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});



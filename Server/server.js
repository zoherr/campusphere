import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "./utils/connectDB.js"
import { app } from "./app.js";

dotenv.config();
mongoose.set("strictQuery", true);

app.listen(process.env.PORT, '0.0.0.0',() => {
  connectDB();
  console.log("Server is running on port 8000!");
});
j
// app.listen(process.env.PORT, () => {
//   connectDB();
//   console.log("Server is running on port 8000!");
// });
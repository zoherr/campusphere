import express from "express";

import { verifyToken } from "../middlwares/jwt.js";
import { getFeeStatus, getPerticulerFeeStatus, intent, studentHistory } from "../controllers/fee.controller.js";

const feeRouter = express.Router();

feeRouter.post("/create-payment-intent", verifyToken, intent);

feeRouter.get("/fee-status", verifyToken,getFeeStatus);
feeRouter.get("/student-fee-status", verifyToken, getPerticulerFeeStatus);
feeRouter.get("/student-fee-history",verifyToken,studentHistory)
export default feeRouter;

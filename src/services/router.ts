import { Router } from "express";
const router = Router();
import authRoute from "../modules/auth/authRouter";

router.use("/auth", authRoute);

export default router;
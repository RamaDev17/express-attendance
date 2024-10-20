import { Router } from "express";
import { getDetailUser } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", verifyToken, getDetailUser)

export default router
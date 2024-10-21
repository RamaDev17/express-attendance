import { Router } from "express";
import { getDetailUser } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";
import { checkRole } from "../middlewares/checkRole";
import { Roles } from "../utils/roles";

const router = Router();

router.get("/profile", verifyToken, checkRole([Roles.all]), getDetailUser)

export default router
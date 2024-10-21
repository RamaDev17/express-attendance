import { Router } from "express";
import { createUser, getAllUser, getDetailUser } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";
import { checkRole } from "../middlewares/checkRole";
import { Roles } from "../utils/roles";
import { createUserSchema } from "../validators/userValidator";

const router = Router();

router.get("/profile", verifyToken, checkRole([Roles.all]), getDetailUser)
router.post("/", verifyToken, checkRole([Roles.super_admin]), createUserSchema(), createUser)
router.get("/", verifyToken, checkRole([Roles.super_admin]), getAllUser)

export default router
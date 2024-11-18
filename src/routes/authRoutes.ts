import { Router } from "express";
import { login, logout, validateToken } from "../controllers/authController";

const router = Router();

router.post("/login", login)
router.get("/validate", validateToken)
router.post("/logout", logout)

export default router
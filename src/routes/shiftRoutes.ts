import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { checkRole } from "../middlewares/checkRole";
import { Roles } from "../utils/roles";
import { createShift, deleteShift, getAllShift, getDetailShift, updateShift } from "../controllers/shiftController";
import { createShiftsSchema, updateShiftsSchema } from "../validators/shiftValidator";

const router = Router();

router.get("/", verifyToken, checkRole([Roles.all]), getAllShift)
router.post("/", verifyToken, checkRole([Roles.super_admin]), createShiftsSchema(), createShift)
router.get("/:id", verifyToken, checkRole([Roles.all]), getDetailShift)
router.put("/:id", verifyToken, checkRole([Roles.super_admin]), updateShiftsSchema(), updateShift)
router.delete("/:id", verifyToken, checkRole([Roles.super_admin]), deleteShift)

export default router
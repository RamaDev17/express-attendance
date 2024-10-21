import { Router } from "express";
import { createOffice, deleteOffice, getAllOffice, getDetailOffice, updateOffice } from "../controllers/officeController";
import { verifyToken } from "../middlewares/authMiddleware";
import { checkRole } from "../middlewares/checkRole";
import { Roles } from "../utils/roles";
import { createOfficeSchema, updateOfficeSchema } from "../validators/officeValidator";

const router = Router();

router.get("/", verifyToken, checkRole([Roles.all]), getAllOffice)
router.post("/", verifyToken, checkRole([Roles.super_admin]), createOfficeSchema(), createOffice)
router.get("/:id", verifyToken, checkRole([Roles.all]), getDetailOffice)
router.put("/:id", verifyToken, checkRole([Roles.super_admin]), updateOfficeSchema(), updateOffice)
router.delete("/:id", verifyToken, checkRole([Roles.super_admin]), deleteOffice)

export default router
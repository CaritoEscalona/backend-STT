import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../middlewares/validators.js";

const router = Router();

router.post("/auth/register", registerValidation, register);
router.post("/auth/login", loginValidation, login);

export default router;

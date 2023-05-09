import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    getUsuarios,
    getUsuarioAutenticado,
    getUsuarioById,
    deleteUsuario,
    updateUsuario
} from "../controllers/usuarioController.js";
import { register } from "../controllers/authController.js";

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id');
router.get("/me", authMiddleware, getUsuarioAutenticado);
router.get('/usuarios/:id', getUsuarioById);
router.post('/usuarios', register);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id',deleteUsuario);

export default router;

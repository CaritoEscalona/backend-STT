import { body } from "express-validator";

export const registerValidation = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("apellido").notEmpty().withMessage("El apellido es obligatorio"),
  body("rut").notEmpty().withMessage("El RUT es obligatorio"),
  body("correo").isEmail().withMessage("El correo debe ser válido"),
  body("pass").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("id_rol").notEmpty().withMessage("El ID de rol es obligatorio"),
];

export const loginValidation = [
  body("correo").isEmail().withMessage("El correo debe ser válido"),
  body("pass").notEmpty().withMessage("La contraseña es obligatoria"),
];


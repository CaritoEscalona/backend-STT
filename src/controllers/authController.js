import { validationResult } from 'express-validator';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/Usuario.js';

export const register = async (req, res) => {
    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { nombre, apellido, rut, correo, pass, id_rol } = req.body;
  
    try {
      // Verificar si el correo ya está registrado
      const usuarioExistente = await Usuario.findOne({ where: { correo } });
      if (usuarioExistente) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }
  
      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);
  
      // Guardar el usuario en la base de datos
      const newUser = await Usuario.create({
        nombre,
        apellido,
        rut,
        correo,
        pass: hashedPass,
        id_rol,
      });
  
      res.status(201).json({ message: 'Usuario registrado con éxito', newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const login = async (req, res) => {
  // Verificar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { correo, pass } = req.body;

  try {
    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    // Verificar si la contraseña coincide
    const isMatch = await bcrypt.compare(pass, usuario.pass);
    if (!isMatch) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    // Crear y firmar el token JWT con duración de 12 horas (pasado ese tiempo debe re-logear)
    const payload = { id: usuario.id, rol: usuario.id_rol };
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "12h" });

    // Enviar el token al cliente
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

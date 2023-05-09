import { Tienda } from "../models/Tienda.js";

export const getTiendas = async (req, res) => {
  try {
    const tiendas = await Tienda.findAll();
    res.status(200).json(tiendas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tiendas." });
  }
};

export const getTiendaById = async (req, res) => {
  try {
    const tienda = await Tienda.findByPk(req.params.id);
    res.json(tienda);
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener la tienda.' });
  }
};

export const getTiendaByUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const tienda = await Tienda.findOne({ where: { id_usuario } });
    res.status(200).json(tienda);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tienda por usuario" });
  }
};

export const createTienda = async (req, res) => {
  try {
    const id_user = req.user.id;
    const { nombre, descripcion, correo } = req.body;
    // Verificar si el usuario tiene una tienda creada
    const tienda = await Tienda.findOne({
      where: {
        id_usuario: id_user,
      },
    });
    
    if (tienda) {
      return res
        .status(400)
        .json({ message: "El usuario ya tiene una tienda creada" });
    }

    const newTienda = await Tienda.create({
      nombre,
      descripcion,
      correo,
      id_usuario: id_user,
    });

    return res.status(201).json({ newTienda });
  } catch (error) {
    return res.status(400).json({});
  }
};

export const deleteTienda = async (req, res) => {
  try {
    const { id } = req.params;
    // Verificar si la tienda existe
    const tiendaExistente = await Tienda.findOne({
      where: {
        id,
      },
    });

    if (!tiendaExistente) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    // Eliminar la tienda
    await Tienda.destroy({
      where: {
        id,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTienda = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, correo } = req.body;

    // Verificar si el usuario tiene una tienda creada
    const tienda = await Tienda.findOne({
      where: {
        id_usuario: req.user.id,
      },
    });

    if (!tienda) {
      return res.status(400).json({
        message: "No se encontró una tienda asociada a este usuario.",
      });
    }

    // Verificar si la tienda existe
    const tiendaExistente = await Tienda.findOne({
      where: {
        id,
      },
    });

    if (!tiendaExistente) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    // Verificar si la tienda pertenece al usuario autenticado
    if (tiendaExistente.id_usuario !== req.user.id) {
      return res.status(401).json({
        message: "No tienes permisos para actualizar esta tienda",
      });
    }
    await tiendaExistente.update({
      nombre,
      descripcion,
      correo,
    });

    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

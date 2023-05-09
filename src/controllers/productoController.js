import { Producto } from "../models/Producto.js";
import { Tienda } from "../models/Tienda.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos." });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto.' });
  }
};

export const getProductosByTienda = async (req, res) => {
  const { id_tienda } = req.params;

  try {
    const productos = await Producto.findAll({ where: { id_tienda } });
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos por tienda" });
  }
};

export const getProductoByTiendaAndSku = async (req, res) => {
  const { id_tienda, sku } = req.params;

  try {
    const producto = await Producto.findOne({ where: { id_tienda, sku } });
    res.status(200).json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener producto por tienda y SKU" });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { sku, nombre, descripcion, stock, precio, id_categoria } = req.body;

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

    // Verificar si el producto existe
    const productoExistente = await Producto.findOne({
      where: {
        id_tienda: tienda.id,
        sku,
      },
    });

    if (productoExistente) {
      return res
        .status(400)
        .json({ message: "Ya existe un producto con este SKU en esta tienda" });
    }

    const newProducto = await Producto.create({
      sku,
      nombre,
      descripcion,
      stock,
      precio,
      id_categoria,
      id_tienda: tienda.id, // Asignar el ID de la tienda del usuario al producto
    });
    return res.status(201).json({ newProducto });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

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
    // Verificar si el producto existe
    const productoExistente = await Producto.findOne({
      where: {
        id,
      },
    });
    if (!productoExistente) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar el producto
    await Producto.destroy({
      where: {
        id,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, nombre, descripcion, stock, precio, id_categoria } = req.body;
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

    // Verificar si el producto existe
    const productoExistente = await Producto.findOne({
      where: {
        id_tienda: tienda.id,
        sku,
      },
    });

    if (!productoExistente) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    //Actualizar el producto
    productoExistente.update({
      nombre,
      descripcion,
      stock,
      precio,
      id_categoria,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

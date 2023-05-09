import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Carrito } from "./Carrito.js";
import { Categoria } from "./Categoria.js";
import { Tienda } from "./Tienda.js";

export const Producto = sequelize.define("Producto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sku: {
    type: DataTypes.STRING(255),
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
  descripcion: {
    type: DataTypes.STRING(255),
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

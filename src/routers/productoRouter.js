import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { 
    getProductos,
    getProductoById,
    getProductosByTienda,
    getProductoByTiendaAndSku,
    createProducto,
    deleteProducto, 
    updateProducto
} from "../controllers/productoController.js";

const router = Router();

router.get("/productos", getProductos);
router.get('/productos/:id', getProductoById);
router.get("/productos/tienda/:id_tienda", getProductosByTienda);
router.get("/productos/tienda/:id_tienda/sku/:sku", getProductoByTiendaAndSku);
router.post("/productos", authMiddleware, createProducto);
router.put("/productos",authMiddleware, updateProducto);
router.delete("/productos/:id", authMiddleware, deleteProducto);

export default router;

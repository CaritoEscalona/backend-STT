import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import { associateModels } from './models/associations.js';
import usuarioRouter from "./routers/usuarioRouter.js";
import tiendaRouter from "./routers/tiendaRouter.js";
import productoRouter from "./routers/productoRouter.js";
import authRouter from './routers/authRouter.js';

dotenv.config();

const app = express();

// Relationships between entities. It should be before the middleware
associateModels();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(authRouter);
app.use(usuarioRouter);
app.use(tiendaRouter);
app.use(productoRouter);

export default app;


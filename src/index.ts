import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.controller";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/items", itemsRouter);

export default app;
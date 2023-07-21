import { Router } from "express";
import { altairMiddleware } from "../middlewares/altair";

export const altairRoute = Router()

altairRoute.use("/", altairMiddleware)
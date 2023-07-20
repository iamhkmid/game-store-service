import { Router } from "express";
import { altairEnv, altairMiddleware } from "../middlewares/altair";

export const altairRoute = Router()

altairRoute.use("/", altairEnv, altairMiddleware)
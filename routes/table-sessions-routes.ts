import { Router } from "express";
import { TableSessionsController } from "../controllers/table-sessions-controller.js";

const tableSessionsRouter = Router()
const tableSessionsController = new TableSessionsController()

tableSessionsRouter.post("/", tableSessionsController.create)
tableSessionsRouter.get("/", tableSessionsController.index)

export {tableSessionsRouter}
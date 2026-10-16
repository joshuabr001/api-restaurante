import { Router } from "express"
import { TablesController } from "../controllers/tables-controller.js"

const tablesRouter = Router()
const tablesController = new TablesController()

tablesRouter.get("/", tablesController.index)

export { tablesRouter }

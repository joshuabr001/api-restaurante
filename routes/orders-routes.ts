import { Router } from "express"
import { OrdersController } from "../controllers/orders-controller.js"

const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.post("/", ordersController.create)
ordersRouter.get("/table-session/:table_session_id", ordersController.index)
ordersRouter.get("/table-session/:table_session_id/total", ordersController.show)

export { ordersRouter }

import { Router } from "express"
import { OrdersController } from "../controllers/orders-controller.js"

const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.post("/", ordersController.create)

export { ordersRouter }

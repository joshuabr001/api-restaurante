import { Router } from "express"
import { productsRouter } from "./products-routes.js"
import { tablesRouter } from "./tables-routes.js"
import { tableSessionsRouter } from "./table-sessions-routes.js"
import { ordersRouter } from "./orders-routes.js"

const routes = Router()

routes.use("/products", productsRouter)
routes.use("/tables", tablesRouter)
routes.use("/table-sessions", tableSessionsRouter)
routes.use("/orders", ordersRouter)

export { routes }

import { Router } from "express"
import { productsRouter } from "./products-routes.js"
import { tablesRouter } from "./tables-routes.js"
import { tableSessionsRouter } from "./table-sessions-routes.js"

const routes = Router()

routes.use("/products", productsRouter)
routes.use("/tables", tablesRouter)
routes.use("/table-sessions", tableSessionsRouter)

export { routes }

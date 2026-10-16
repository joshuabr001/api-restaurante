import { Router } from "express"
import { productsRouter } from "./products-routes.js"
import { tablesRouter } from "./tables-routes.js"

const routes = Router()

routes.use("/products", productsRouter)
routes.use("/tables", tablesRouter)

export { routes }

import { Router } from "express"
import { productsRouter } from "./products-routes.js"

const routes = Router()

routes.use("/products", productsRouter)

export { routes }

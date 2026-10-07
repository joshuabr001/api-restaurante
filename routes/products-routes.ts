import { Router } from "express"
import { ProductController } from "../controllers/products-contoller.js"

const productsRouter = Router()
const productController = new ProductController()

productsRouter.get("/", productController.index)

export { productsRouter }

import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError.js"
import { z } from "zod"
import { knex } from "../src/database/knex.js"

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      })

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body,
      )

      const session = await knex<TableSessionsRepository>("table_sessions")
        .where({ id: table_session_id })
        .first()

      if (!session) {
        throw new AppError("Session not found")
      }

      if (session.closed_at) {
        throw new AppError("Session is closed")
      }

      const product = await knex<ProductRepository>("produto")
        .where({ id: product_id })
        .first()

      if (!product) {
        throw new AppError("This product_id not found")
      }

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      })

      response.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }
}

export { OrdersController }

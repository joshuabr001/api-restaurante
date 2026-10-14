import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError.js"
import { z } from "zod"
import { knex } from "../src/database/knex.js"

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query

      const products = await knex<ProductRepository>("produto")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name")
      response.json(products)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0, { message: "value must be greater than 0" }),
      })

      const { name, price } = bodySchema.parse(request.body)

      await knex<ProductRepository>("produto").insert({ name, price })

      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "Must be a number" })
        .parse(request.params.id)

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0, { message: "value must be greater than 0" }),
      })

      const { name, price } = bodySchema.parse(request.body)

      await knex<ProductRepository>("produto")
        .update({
          name,
          price,
          updated_at: knex.fn.now(),
        })
        .where("id", id)

      return response.json()
    } catch (error) {
      next(error)
    }
  }
}

export { ProductController }

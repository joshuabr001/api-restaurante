import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { knex } from "../src/database/knex.js"
import { AppError } from "../utils/AppError.js"

class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>("tables")
        .select()
        .orderBy("table_number")

      return response.json(tables)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_number: z.number(),
      })

      const { table_number } = bodySchema.parse(request.body)

      const table = await knex<TableRepository>("tables")
        .where({ table_number })
        .first()

      if (table) {
        throw new AppError("This table is already created")
      }

      await knex<TableRepository>("tables").insert({
        table_number,
        created_at: knex.fn.now(),
      })

      return response.json()
    } catch (error) {
      next(error)
    }
  }
}

export { TablesController }

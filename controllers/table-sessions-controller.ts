import { Request, Response, NextFunction } from "express"
import { knex } from "../src/database/knex.js"
import { z } from "zod"
import { AppError } from "../utils/AppError.js"

class TableSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      })

      const { table_id } = bodySchema.parse(request.body)

      const session = await knex<TableSessionsRepository>("table_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first()

      if (session && !session.closed_at) {
        throw new AppError("This table is already open")
      }

      await knex<TableSessionsRepository>("table_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      })

      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions =
        await knex<TableSessionsRepository>("table_sessions").orderBy(
          "closed_at",
        )
      return response.status(200).json(sessions)
    } catch (error) {
      next(error)
    }
  }
}

export { TableSessionsController }

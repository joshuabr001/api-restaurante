import { Request, Response, NextFunction } from "express"
import { knex } from "../src/database/knex.js"

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
}

export { TablesController }

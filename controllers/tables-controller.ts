import { Request, Response, NextFunction } from "express"
import knex, { Knex } from "knex"

class TablesControler {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tables = await knex("tables").select().orderBy("table_number")

    } catch (error) {
      next(error)
    }
  }
}

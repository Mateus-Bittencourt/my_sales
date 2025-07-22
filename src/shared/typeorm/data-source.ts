import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.db_host,
  port: process.env.db_port as number | undefined,
  username: process.env.db_username,
  database: process.env.db_name,
  password: process.env.db_password,
  entities: ['./src/modules/**/database/entities/*.{ts, js}'],
  migrations: ['./src/shared/typeorm/migrations/*.{ts, js}']
})

import { DataSource } from 'typeorm'
import secret from './secret'

const db = new DataSource({
  type: 'postgres',
  host: secret.DB_HOST,
  port: parseInt(secret.DB_PORT),
  database: secret.DB_NAME,
  username: secret.DB_USER,
  password: secret.DB_PASS,
  synchronize: false,
  logging: false,
  entities: ['./src/database/entities/*.entity.ts'],
  migrations: ['./src/database/migrations/*-migrate.ts'],
  subscribers: [],
})

export default db

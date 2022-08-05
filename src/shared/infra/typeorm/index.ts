import { createConnection, DataSource } from "typeorm";

createConnection({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: (process.env.POSTGRES_PORT as unknown as number) || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'docker',
  database: process.env.POSTGRES_DATABASE || 'maisa',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./migrations/*.ts'],
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: (process.env.POSTGRES_PORT as unknown as number) || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'docker',
  database: process.env.POSTGRES_DATABASE || 'maisa',
  migrations: ['./migrations/*.ts'],
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts']
});

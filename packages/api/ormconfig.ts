/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config({ path: '.env.ormconfig' })

module.exports = [
  {
    name: 'prod',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: ['./src/migrations/*.ts'],
    cli: {
      migrationsDir: './src/migrations',
    },
    entities: ['./src/**/*.entity.ts'],
    logging: true,
  },
]

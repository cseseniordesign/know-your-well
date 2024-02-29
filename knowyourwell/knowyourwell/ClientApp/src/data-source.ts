import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mssql',
    host: 'localhost',
    username: 'kydAdmin',
    password: 'Snickers9!',
    database: 'kyw',
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});

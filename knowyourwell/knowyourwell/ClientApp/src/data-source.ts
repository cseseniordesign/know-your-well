import { DataSource } from 'typeorm';
import { TblWellInfo } from './entities/TblWellInfo';

export const AppDataSource = {
    dataSource: new DataSource({
        type: 'mssql',
        host: 'localhost',
        username: 'kywAdmin',
        password: 'Snickers9!',
        database: 'kyw',
        synchronize: true,
        logging: true,
        entities: [TblWellInfo],
        subscribers: [],
        migrations: [],
        options: {
            encrypt: true, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    }),
    async initialize() {
        try {
            await this.dataSource.initialize();
            console.log("Data Source has been initialized!");
        } catch (error) {
            console.error("Error during Data Source initialization:", error);
            throw error;
        }
    },
};

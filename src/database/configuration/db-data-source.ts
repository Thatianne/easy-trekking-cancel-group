import { join } from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

console.log(join(__dirname, './../../entities/{*.ts,*.js}'));
const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'Z',
    synchronize: false,
    logging: true,
    entities: [join(__dirname, './../../entities/{*.ts,*.js}')]
});

export { AppDataSource };

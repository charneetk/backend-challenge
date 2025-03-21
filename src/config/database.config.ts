import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export default (): TypeOrmModuleOptions => {
    return {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(`${process.env.DB_PORT}`) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [join(__dirname, '..','**', '*.entity{.ts,.js}')],
        synchronize: true,
        logging: true
    }

}
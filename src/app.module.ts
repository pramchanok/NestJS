import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";
import { UtilityModule } from "./shared/utility/utility.module";
import { GlobalHelperModule } from "./shared/global-helper/global-helper.module";
import { CustomerModule } from "./customer/customer.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Dialect } from "sequelize";
import { Customer } from "./customer/entities/customer.entity";
import { AuthModule } from "./auth/auth.module";
import { User } from "./auth/entities/user.entity";

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: process.env.DB_DIALECT as Dialect,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            models: [Customer, User],
            // autoLoadModels: true,
            // sync: { alter: true },
            synchronize: true,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 30000,
            },
        }),
        ProductModule,
        UtilityModule,
        GlobalHelperModule,
        CustomerModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

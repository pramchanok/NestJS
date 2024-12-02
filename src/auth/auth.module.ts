import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ProductModule } from "src/product/product.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        ProductModule,
        JwtModule.register({
            signOptions: { expiresIn: "1d" },
        }),
        SequelizeModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

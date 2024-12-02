import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { hash, genSalt, compare } from "bcrypt";
import { User } from "./entities/user.entity";
import { InjectModel } from "@nestjs/sequelize";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const user = await this.userModel.findOne({
            where: {
                email: registerDto.email,
            },
        });

        if (user) {
            throw new BadRequestException("Email already exists");
        }

        // hassh password
        const salt = await genSalt(10);
        const hashedPassword = await hash(registerDto.password, salt);

        // create user
        const newUser = await this.userModel.create({
            fullname: registerDto.fullName,
            email: registerDto.email,
            password: hashedPassword,
        });

        return newUser;
    }

    async login(loginDto: LoginDto) {
        const user = await this.userModel.findOne({
            where: {
                email: loginDto.email,
            },
        });

        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        const isValidPassword = await compare(loginDto.password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedException("Invalid password");
        }

        //generate token
        const payload = { id: user.id };
        const token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });
        return {
            access_token: token,
        };
    }

    async getUserProfile(id: number) {
        const user = await this.userModel.findByPk(id, {
            attributes: { exclude: ["password"] },
        });
        return user;
    }
}

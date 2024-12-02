import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller({
    path: "auth",
    version: "1",
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    @HttpCode(201)
    async register(@Body() registerDto: RegisterDto) {
        await this.authService.register(registerDto);
        return {
            message: "User registered successfully",
        };
    }

    @Post("login")
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return this.authService.getUserProfile(req.user.user_id);
    }
}

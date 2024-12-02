import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getHello(): string {
        return "Hello World! NestJS with TypeScript";
    }

    getApi(): object {
        return {
            message: "API Service is up and running",
            version: "1.0.0",
        };
    }
}

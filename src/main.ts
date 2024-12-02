import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpStatus, ValidationPipe, VersioningType } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // global prefix
    app.setGlobalPrefix("api");

    app.useGlobalPipes(
        new ValidationPipe({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    );

    // api versioning
    app.enableVersioning({
        type: VersioningType.URI,
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

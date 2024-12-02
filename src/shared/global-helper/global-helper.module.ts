import { Module, Global } from "@nestjs/common";
import { GlobalHelperService } from "./global-helper.service";

@Global()
@Module({
    providers: [GlobalHelperService],
    exports: [GlobalHelperService],
})
export class GlobalHelperModule {}

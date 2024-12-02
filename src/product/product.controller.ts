import { Controller, Get } from "@nestjs/common";
import { GlobalHelperService } from "src/shared/global-helper/global-helper.service";
import { UtilityService } from "src/shared/utility/utility.service";

@Controller({
    path: "product",
    version: "1",
})
export class ProductController {
    constructor(
        private readonly utilityService: UtilityService,
        private readonly globalHelperService: GlobalHelperService,
    ) {}

    @Get()
    getProducts() {
        return {
            version: process.env.API_VERSION,
            products: ["Product 1", "Product 2", "Product 3"],
        };
    }

    @Get("date")
    getDate() {
        // throw new HttpException("ไม่พบวันที่ในระบบ", HttpStatus.BAD_REQUEST);
        return {
            server_date: this.utilityService.getServerDate(),
        };
    }

    @Get("thai-date")
    getThaiDate() {
        return {
            server_thai_date: this.globalHelperService.getServerThaiDate(),
        };
    }
}

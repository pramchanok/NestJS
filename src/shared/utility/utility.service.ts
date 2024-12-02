import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilityService {
    getServerDate(): string {
        return new Date().toLocaleDateString();
    }
}

import { Injectable } from "@nestjs/common";
import { format } from "date-fns";
import { th } from "date-fns/locale";

@Injectable()
export class GlobalHelperService {
    getServerThaiDate() {
        return format(new Date(), "dd MMMM yyyy HH:mm:ss", { locale: th });
    }
}

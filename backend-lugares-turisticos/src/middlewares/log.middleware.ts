import {Injectable, NestMiddleware} from "@nestjs/common";
const fs = require('fs');
import * as path from 'path';
@Injectable()
export class LogMiddleware implements NestMiddleware {

    guardarRespuesta(request){
        const respuesta = {
            baseUrl: request.baseUrl,
            hostname: request.hostname,
            subdomains: request.subdomains,
            ip: request.ip,
            method: request.method,
            originalUrl: request.originalUrl,
            path: request.path,
            protocol: request.protocol,
            headers: request.headers,
        };
        return respuesta;
    }

    guardarArchivo(request){
        fs.writeFile(path.join(__dirname, "logs.txt"), JSON.stringify(this.guardarRespuesta(request)), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    use(req: Request, res: Response, next: () => void): any {
        this.guardarArchivo(req);
        next();
    }



}
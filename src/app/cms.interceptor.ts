import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CmsContext } from "./auth/CmsContext";

@Injectable()
export class CmsInterceptor implements HttpInterceptor {
    constructor() {}

    cmsUrl: string = "https://tunestory-strapi.herokuapp.com/api";

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (request.context.has(CmsContext))
            request = request.clone({
                url: this.cmsUrl + request.url
            });

        return next.handle(request);
    }
}

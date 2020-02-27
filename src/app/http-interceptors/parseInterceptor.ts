import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "@env/environment"
@Injectable()
export class ParseInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const parseAplicationHeader = req.clone({
            headers: req.headers.set('X-Parse-Application-Id', environment.parseAplicationId),
        });

        const parseRestHeader = parseAplicationHeader.clone({
            headers: parseAplicationHeader.headers.set('X-Parse-REST-API-Key:', `Bearer ${environment.parseJavaScriptKey}`),
        });

        return next.handle(parseRestHeader);
    }
}
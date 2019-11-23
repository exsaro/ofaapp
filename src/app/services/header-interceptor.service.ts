import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (true) { // e.g. if token exists, otherwise use incomming request.
        return next.handle(req.clone({
            setHeaders: {
                'Content-type': 'application/json'
            }
        }));
    }
    else {
        return next.handle(req);
    }
}
  constructor() { }
}

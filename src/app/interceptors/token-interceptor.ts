import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthService } from '../shared-services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.loggedIn()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `bearer ${this.auth.getToken()}`
                }
            });
            console.log(request);

        } else {
            // this.auth.refreshToken();
        }
        return next.handle(request);
    }
}

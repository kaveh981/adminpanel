import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../shared-services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('hereeeeJwt');
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    return this.auth.refreshToken()
                        .subscribe((token) => {
                            this.auth.addTokens(token['accssToken']);
                            const authReqRepeat = this.authenticateRequest(request);
                            console.log('*Repeating httpRequest*', authReqRepeat);
                            return next.handle(authReqRepeat);
                        });
                }
            }
        });
    }

    authenticateRequest(request) {
        return request = request.clone({
            setHeaders: {
                Authorization: `bearer ${this.auth.getToken()}`
            }
        });
    }

}


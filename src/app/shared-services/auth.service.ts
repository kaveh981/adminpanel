import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ApiService } from './api.service';


@Injectable()
export class AuthService {
    requireLoginSubject: Subject<boolean>;
    tokenIsBeingRefreshed: Subject<boolean>;
    lastUrl: string;
    jwtHelper: JwtHelper = new JwtHelper();
    roles = [];
    // cachedRequests: Array<HttpRequest<any>> = [];

    constructor(private apiService: ApiService) {
        this.requireLoginSubject = new Subject<boolean>();
        this.tokenIsBeingRefreshed = new Subject<boolean>();
        this.tokenIsBeingRefreshed.next(false);
        this.lastUrl = '/home';
    }

    isUserAuthenticated() {
        if (this.loggedIn()) {
            this.requireLoginSubject.next(false);
            return true;
        } else {
            return false;
        }
    }

    login(credential: Credential): Observable<any> {
        return this.apiService.post<AuthReturn>('membership/login?permanent=true',
            credential);
    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return token && !this.jwtHelper.isTokenExpired(token);
    }

    hasRole(role) {
        if (this.roles.length < 1) {
            this.addRoles();
        }
        return this.roles.indexOf(role) !== -1;
    }

    addRoles() {
        const token = localStorage.getItem('token');
        this.roles = this.jwtHelper.decodeToken(token).roles;
    }

    addTokens(accessToken: string, refreshToken?: string) {
        localStorage.setItem('token', accessToken);
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }

    getRefreshTokenExpirationDate() {
        const token = localStorage.getItem('token');
        if (token) {
            const tokenExpDate = this.jwtHelper.getTokenExpirationDate(token);
            const sessionExpDate = new Date(tokenExpDate.getTime() + 4 * 60000);
            const isExpired = this.jwtHelper.isTokenExpired(token);
            if (new Date() > sessionExpDate) {
                this.logout();
            }
            return sessionExpDate;
        }

        return null;
    }


    getToken(): string {
        return localStorage.getItem('token');
    }


    // public collectFailedRequest(request): void {
    //     this.cachedRequests.push(request);
    // }
    public retryFailedRequests(): void {
        // retry the requests. this method can
        // be called after the token is refreshed
    }

    hasRefreshToken() {
        const refToken = localStorage.getItem('refreshToken');

        if (refToken == null) {
            this.logout();
        }

        return refToken != null;
    }

    refreshTokenSuccessHandler(data) {
        if (data.error) {
            console.log('Removing tokens.');
            this.logout();
            this.requireLoginSubject.next(true);
            this.tokenIsBeingRefreshed.next(false);
            // this.router.navigateByUrl('/login');
            return false;
        } else {
            this.addTokens(data.token.accessToken, data.token.refreshToken);
            this.requireLoginSubject.next(false);
            this.tokenIsBeingRefreshed.next(false);
            console.log('Refreshed user token');
        }
    }

    refreshTokenErrorHandler(error) {
        this.requireLoginSubject.next(true);
        this.logout();
        this.tokenIsBeingRefreshed.next(false);
        // this.router.navigate(['/sessiontimeout']);
        console.log(error);
    }

    refreshToken() {
        const refToken = localStorage.getItem('refreshToken');
        //let refTokenId = this.jwtHelper.decodeToken(refToken).refreshTokenId;
        // const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //  const options = new RequestOptions({ headers: headers });
        const body = new URLSearchParams();
        body.set('client_id', '099153c2625149bc8ecb3e85e03f0022');
        body.set('grant_type', 'refreshToken');
        body.set('refreshToken', refToken);

        return this.apiService.post<any>('membership/token', body);

    }

    tokenRequiresRefresh(): boolean {
        if (!this.loggedIn()) {
            console.log('Token refresh is required');
        }

        return !this.loggedIn();
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.requireLoginSubject.next(true);
    }
}

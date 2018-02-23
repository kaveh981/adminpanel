import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class ApiService {

    routhEndpoint = environment.apiHost;

    constructor(private http: HttpClient) { }

    public get<T>(route: string): Observable<any> {
        return this.http.get<T>(`${this.routhEndpoint}/${route}`);
    }

    public delete<T>(route: string): Observable<any> {
        return this.http.delete<T>(`${this.routhEndpoint}/${route}`);
    }

    public put<T>(route: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.routhEndpoint}/${route}`, body);
    }

    public post<T>(route: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.routhEndpoint}/${route}`, body);
    }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>('https://wvapp-user-registration.herokuapp.com/login', { username: username, password: password },
        {observe: 'response'})
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
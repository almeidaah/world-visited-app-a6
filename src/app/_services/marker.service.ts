import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Marker } from '../_models';

@Injectable()
export class MarkerService {
    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<User[]>(`${config.apiUrl}/users`);
    // }

    // getById(id: number) {
    //     return this.http.get(`${config.apiUrl}/users/` + id);
    // }

    register(marker: Marker) { 
        return this.http.post('http://localhost:8080/markers/5bf6b281f3212b5d49f877a8', marker);
    }

    // update(user: User) {
    //     return this.http.put(`${config.apiUrl}/users/` + user.id, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/` + id);
    // }
}
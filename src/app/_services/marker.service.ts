import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Marker } from '../_models';

@Injectable()
export class MarkerService {
    constructor(private http: HttpClient) { }

    register(marker: Marker) { 
        return this.http.post('http://localhost:8080/markers/5bf6b281f3212b5d49f877a8', marker);
    }
    
}
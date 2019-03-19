import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Marker } from '../_models';

@Injectable()
export class MarkerService {
    constructor(private http: HttpClient) { }

    register(marker: Marker) { 
        return this.http.post('https://wvapp-user-registration.herokuapp.com/markers/5be4321ef3212b2274d55e62', marker);
    }
    
}
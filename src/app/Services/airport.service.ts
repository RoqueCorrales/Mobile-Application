import { Injectable } from "@angular/core";
import { of as ObservableOf, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Airport } from '../Models/airport.model';
import { GLOBAL } from "../global";



@Injectable()
export class AirportService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        
    }

    public getActiveAirports(): Observable<Airport[]> {
        return this.http.get<Airport[]>(`${GLOBAL.statsApi}airports/rest/v1/json/active?` + `appId=${GLOBAL.appId}&appKey=${GLOBAL.appKey}`);
    }

}
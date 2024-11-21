import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garage } from './models/garage';

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  private apiUrl = '/api/garage';
  constructor(private http: HttpClient) {}

  getGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(this.apiUrl);
  }

  addGarages(garages: Garage[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/`, garages);
  }
}

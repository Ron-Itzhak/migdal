import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Garage } from './models/garage';

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  private apiUrl = '/api/garages';

  constructor(private http: HttpClient) {}

  getGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(this.apiUrl);
  }

  addGarages(garages: Garage[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/`, { garages });
  }

  fetchExternalGarages(offset: number, limit: number): Observable<any[]> {
    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=${limit}&offset=${offset}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.result.records),
      catchError((error) => {
        console.error('Error fetching garages:', error);
        return of([]);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabService {
  private apiUrl = 'http://localhost:3000/api/v1/item-series';

  constructor(private http: HttpClient) {}

  getItemSeries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

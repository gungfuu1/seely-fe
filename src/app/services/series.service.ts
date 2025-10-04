import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private apiUrl = 'http://localhost:3000/api/v1/item-series';

  constructor(private http: HttpClient) {}

  // ดึงข้อมูล series ตาม id
  getSeries(id: number | string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ลบ series ตาม id
  deleteSeries(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

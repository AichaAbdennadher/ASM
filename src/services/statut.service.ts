import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatutService {
  private apiUrl = 'http://127.0.0.1:8000/api/statuts'; 

  constructor(private http: HttpClient) {}

  getStatuts(page: number = 1) {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }
//   getStatut(id: number): Observable<any> {
//   return this.http.get(`http://127.0.0.1:8000/api/statuts/${id}`);
// }
ajouterStatut(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

supprimerStatut(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}




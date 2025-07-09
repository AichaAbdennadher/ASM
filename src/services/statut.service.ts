import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StatutService {

   constructor(private http: HttpClient) {}

  getAllStatuts(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/statuts');
  }
}




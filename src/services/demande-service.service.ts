import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemandeService {
  private apiUrl = 'http://127.0.0.1:8000/api/demandes'; 

  constructor(private http: HttpClient) {}

ajouterDemande(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getDemandes(page: number = 1) {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }
getDureePauseJour(emailEmployee: string, dateSortiePause: string) {
  return this.http.get<number>(`${this.apiUrl}/duree-pause/jour`, {
    params: {
      emailEmployee: emailEmployee,
      date: dateSortiePause
    }
  });
}

getDureePauseMois(emailEmployee: string, dateSortiePause: string) {
  return this.http.get<number>(`${this.apiUrl}/duree-pause/mois`, {
    params: {
      emailEmployee: emailEmployee,
      date: dateSortiePause
    }
  });
}
supprimerDemande(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
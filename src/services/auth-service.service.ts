import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

register(data: { name: string; familyName: string; email: string; password: string; job: string }) {
  return this.http.post(`${this.apiUrl}/register`, data);
}


login(data: any) {
  return this.http.post<any>('http://127.0.0.1:8000/api/login', data).pipe(
    tap(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
      }
      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res.user)); // si tu veux garder user aussi
      }
    })
  );
}
getCurrentUser(): any {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

logout(): Observable<any> {
  const token = localStorage.getItem('token');
  console.log('Token récupéré depuis localStorage :', token);

  // Crée un HttpHeaders seulement si token existe
  let headers = {};
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`
    };
  }

  return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
    tap(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
      console.log('Utilisateur déconnecté.');
    })
  );
}







  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): number {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u).role : -1;
  }
}

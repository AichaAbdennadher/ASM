import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user)); // ← Important !
    })
  );
}


logout(): Observable<any> {
  const token = localStorage.getItem('token');
  console.log(' Token récupéré depuis localStorage :', token); 

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
    tap(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      console.log(' Utilisateur déconnecté.');
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

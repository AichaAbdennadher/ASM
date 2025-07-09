import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string ;job :string}) {
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


  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.clear();
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

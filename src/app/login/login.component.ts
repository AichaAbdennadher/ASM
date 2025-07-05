import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';

  images: string[] = [
    'assets/images/bg1.png',
    'assets/images/bg2.png',
    'assets/images/bg3.png',
    'assets/images/bg4.png'
  ];
  
  currentIndex: number = 0;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000); // change toutes les 4 secondes
  }

  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        const role = this.auth.getUserRole();
        if (role === 0) this.router.navigate(['/admin-dashboard']);
        else           this.router.navigate(['/client-dashboard']);
      },
      error: () => this.error = 'Email ou mot de passe invalide',
    });
  }
}

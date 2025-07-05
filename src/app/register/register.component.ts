import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  name = '';
  FamilyName = '';
  email = '';
  password = '';
  job = '';

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

  register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      job: this.job
      // Ajoute FamilyName ici si nécessaire
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.error(err)
    });
  }
}


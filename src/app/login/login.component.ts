import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
errorMessage = '';
  

  images: string[] = [
    'assets/images/cc.png',
    'assets/images/y2.png',
    'assets/images/finn.png',
    'assets/images/pc.png'
  ];
  
  currentIndex: number = 0;

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000); // change toutes les 4 secondes
  }
login() {
  console.log('Tentative de connexion avec', this.email, this.password);

  this.auth.login({ email: this.email, password: this.password }).subscribe({
    next: () => {
      const role = this.auth.getUserRole();

      if (role === 0) {
        this.router.navigate(['/statuts']);
      } else {
        this.router.navigate(['/demandePause']);
      }
    },
    error: (err) => {
      console.error('Erreur de connexion :', err);

      if (err.status === 401) {
        this.errorMessage = 'Identifiants incorrects.';
      } else if (err.status === 422) {
        this.errorMessage = 'Champs invalides. Vérifiez votre saisie.';
      } else {
        this.errorMessage = err.error?.message || 'Erreur lors de la connexion.';
      }
    }
  });
}
}

import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
showDropdown = false;
 user = {
    name: '',
    email: '',
    familyName:"",
  };
ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      this.user.name = parsedUser.name;
      this.user.email = parsedUser.email;
      this.user.familyName = parsedUser.familyName;
    }
  }
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

closeDropdown() {
  this.showDropdown = false;
}
  constructor(private authService: AuthService, private router: Router) {}

logout() {
  this.authService.logout().subscribe({
    next: () => {
      this.router.navigate(['/login']); // redirection après succès
      console.log('Utilisateur déconnecté.');
    },
    error: err => {
      console.error('Erreur lors de la déconnexion', err);
      this.router.navigate(['/login']);
    }
  });
}

}

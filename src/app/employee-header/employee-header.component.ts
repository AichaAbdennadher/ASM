import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {
  showDropdown = false;
   user = {
      name: '',
      email: '',
      familyName:"",
    };
      constructor(private authService: AuthService, private router: Router) {}
  
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
    setTimeout(() => {
      this.showDropdown = false;
    }, 150); // ⏱ attend un peu avant de fermer
  }
  
  
  
  logout() {
      console.log('Logout cliqué');
  this.showDropdown = false;
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

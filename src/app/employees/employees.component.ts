import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
 constructor(private auth: AuthService) {}
   searchText: string = '';
   users: any[] = [];
   currentPage = 1;
   totalPages = 1;
  
 user = {
  name : '',
  familyName :'',
  email : '',
  password : '',
  job : ''
 };
 
fetchUsers(page: number) {
  this.auth.getUsers(page).subscribe(response => {
    console.log(response); // Vérifier le format ici
    this.users = response.data;
    this.currentPage = response.current_page;
    this.totalPages = response.last_page;
  });
}

 ngOnInit() {
     this.fetchUsers(this.currentPage);
   }
   onPageChanged(page: number) {
     this.fetchUsers(page);
   }
}

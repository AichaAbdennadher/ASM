import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatutsComponent } from './statuts/statuts.component';
import { DemandePauseComponent } from './demande-pause/demande-pause.component';
import { DemandesComponent } from './demandes/demandes.component';
import { EmployeesComponent } from './employees/employees.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login',    component: LoginComponent },
  { path: 'statuts',    component: StatutsComponent },
  { path: 'demandePause',    component: DemandePauseComponent },
  { path: 'demandes',    component: DemandesComponent },
  { path: 'employees',    component: EmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

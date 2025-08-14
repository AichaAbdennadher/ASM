import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatutsComponent} from './statuts/statuts.component';
import { DemandePauseComponent } from './demande-pause/demande-pause.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AddStatutComponent } from './add-statut/add-statut.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotificationComponent } from './notification/notification.component';
import { SuppStatutComponent } from './supp-statut/supp-statut.component';
import { UpdateStatutComponent } from './update-statut/update-statut.component';
import { FilterByLibellePipe } from './filter-by-libelle.pipe';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { CreateDemandeComponent } from './create-demande/create-demande.component';
import { EmployeesComponent } from './employees/employees.component';
import { DemandesComponent } from './demandes/demandes.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { SuppDemandeComponent } from './supp-demande/supp-demande.component';
import { UpdateDemandeComponent } from './update-demande/update-demande.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardEmpComponent } from './dashboard-emp/dashboard-emp.component';
import { ProfilComponent } from './profil/profil.component';
import { NotifAdminComponent } from './notif-admin/notif-admin.component';
import { NotifEmpComponent } from './notif-emp/notif-emp.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StatutsComponent,
    DemandePauseComponent,
    AdminHeaderComponent,
    PaginationComponent,
    AddStatutComponent,
    NotificationComponent,
    SuppStatutComponent,
    UpdateStatutComponent,
    FilterByLibellePipe,
    EmployeeHeaderComponent,
    CreateDemandeComponent,
    EmployeesComponent,
    DemandesComponent,
    FilterByNamePipe,
    SuppDemandeComponent,
    UpdateDemandeComponent,
    DashboardAdminComponent,
    DashboardEmpComponent,
    ProfilComponent,
    NotifAdminComponent,
    NotifEmpComponent,
    FilterByNamePipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
    ReactiveFormsModule,
  HttpClientModule,
   BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:'toast-top-right',
      timeOut: 3000,
      progressBar: true,
    })
  ],
schemas: [CUSTOM_ELEMENTS_SCHEMA], 

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

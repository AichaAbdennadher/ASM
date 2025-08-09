import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { DemandeService } from '../../services/demande-service.service';
import { AuthService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import flatpickr from "flatpickr";

@Component({
  selector: 'app-create-demande',
  templateUrl: './create-demande.component.html',
  styleUrls: ['./create-demande.component.css']
})

export class CreateDemandeComponent implements AfterViewInit{
  constructor(private auth: AuthService,private demandeService: DemandeService,private toastr: ToastrService) {}

    @Input() show: boolean = false;
      @Output() statutAdded = new EventEmitter<void>(); 
    @Output() close = new EventEmitter<void>();

  @ViewChild('datepickerInput') datepickerInput!: ElementRef;
  


demande = {
  raison: '',
  dateSortie: '',
  dateSortiePause: '',
  dateRetour: '',
  dateDemande: new Date(), // facultatif
  statutId: 1,              // valeur par défaut, par exemple 'en attente'
  emailEmployee: ''         // à remplir automatiquement avec l'utilisateur connecté
};
  isHoverSave: boolean = false;
  // Dans ton composant TypeScript
  ngAfterViewInit() {
  flatpickr(this.datepickerInput.nativeElement, {
    dateFormat: "d/m/Y"
  });}
handleReturnTimeChange(): void {
  if (!this.demande.dateSortie || !this.demande.dateRetour) return;

  const [startHour, startMinute] = this.demande.dateSortie.split(':').map(Number);
  const [endHour, endMinute] = this.demande.dateRetour.split(':').map(Number);

  const start = new Date();
  start.setHours(startHour, startMinute, 0);

  const end = new Date();
  end.setHours(endHour, endMinute, 0);

  const diffMs = end.getTime() - start.getTime();
  const diffHours = diffMs / (1000 * 60 * 60); // Convertir en heures

  if (diffHours > 2) {
this.toastr.error('Erreur : temps de pause > 2h');    this.demande.dateRetour = ''; // Réinitialiser le champ
  }
  this.toastr.success('Message envoyé avec succès');

}
  closeModal() {
    this.close.emit();
  }

onSubmit(): void {
  // Remplir l'email automatiquement depuis l'utilisateur connecté
const user = this.auth.getCurrentUser();
if (user?.email) {
  this.demande.emailEmployee = user.email;
}


  // Ajouter la date de demande actuelle
  this.demande.dateDemande = new Date();

  this.demandeService.ajouterDemande(this.demande).subscribe({
    next: (res) => {
      // Réinitialiser le formulaire
      this.demande = {
        raison: '',
        dateSortie: '',
        dateSortiePause: '',
        dateRetour: '',
        dateDemande: new Date(),
        statutId: 1, // par exemple : "en attente"
        emailEmployee: user.email
      };
   
    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout de la demande :', err);
    },
  });
}

}


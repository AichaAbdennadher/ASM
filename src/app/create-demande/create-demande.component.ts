import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, Input, Output, OnChanges, SimpleChanges  } from '@angular/core';
import { DemandeService } from '../../services/demande-service.service';
import { AuthService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import flatpickr from "flatpickr";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-demande',
  templateUrl: './create-demande.component.html',
  styleUrls: ['./create-demande.component.css']
})

export class CreateDemandeComponent implements AfterViewInit , OnChanges {
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
  const user = this.auth.getCurrentUser();
  if (!user?.email) {
    this.toastr.error("Impossible d'envoyer : utilisateur non connecté.");
    return;
  }

  this.demande.emailEmployee = user.email;

  // Vérification que dateRetour >= dateSortie
  if (this.demande.dateSortie && this.demande.dateRetour) {
    if (this.demande.dateRetour < this.demande.dateSortie) {
      this.toastr.error('La date de retour ne peut pas être inférieure à la date de sortie.');
      return;
    }
  }
  // Vérification dateSortiePause >= date système
  if (this.demande.dateSortiePause) {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if (this.demande.dateSortiePause < today) {
      this.toastr.error('La date de sortie en pause doit être supérieure ou égale à aujourd\'hui.');
      return;
    }
  }
  const now = new Date();
  const payload = {
    raison: this.demande.raison,
    dateDemande: formatDate(now, 'yyyy-MM-dd', 'en-US'),
    dateSortiePause: this.demande.dateSortiePause, // "YYYY-MM-DD"
    dateSortie: this.demande.dateSortie || null,
    dateRetour: this.demande.dateRetour || null,
    statutId: 1,
    emailEmployee: this.demande.emailEmployee
  };

  console.log('Payload envoyé à Laravel :', payload);

  this.demandeService.ajouterDemande(payload).subscribe({
    next: () => {
      this.toastr.success('Demande ajoutée avec succès');
      this.close.emit();
    },
    error: (err) => {
      console.error("Erreur lors de l'ajout de la demande :", err);
      this.toastr.error("Erreur lors de l'ajout");
    }
  });
}


flatpickrInstance: any;

  ngAfterViewInit() {
    if (this.show) {
      this.initFlatpickr();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && changes['show'].currentValue === true) {
      // Modal vient d'être ouvert
      this.initFlatpickr();
    }
  }

  initFlatpickr() {
    setTimeout(() => {
      if (!this.flatpickrInstance) {
        this.flatpickrInstance = flatpickr(this.datepickerInput.nativeElement, {
          dateFormat: "Y-m-d",
          onChange: (selectedDates: Date[], dateStr: string) => {
            this.demande.dateSortiePause = dateStr;
          }
        });
      } else {
        this.flatpickrInstance.redraw();
      }
    }, 0);
  }
}



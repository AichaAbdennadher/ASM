import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DemandeService } from '../../services/demande-service.service';
import { AuthService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import flatpickr from "flatpickr";


@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent {
 constructor(private demandeService: DemandeService) {}

  searchText: string = '';
  demandes: any[] = [];
  currentPage = 1;
  totalPages = 1;
  showModal = false;
  isHover = false;
  selectedStatutId: number | null = null;
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

openModal() {
    this.showModal = true;
   // Attendre que la popup soit dans le DOM
flatpickr(this.datepickerInput.nativeElement, {
  dateFormat: "Y-m-d",
  onChange: (selectedDates, dateStr) => {
    this.demande.dateSortiePause = dateStr;
  }
});

  }

 handleClose() {
    this.showModal = false;
  }

    fetchDemandes(page: number) {
    this.demandeService.getDemandes(page).subscribe(response => {
      this.demandes = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
    });
  }
ngOnInit() {
    this.fetchDemandes(this.currentPage);
  }
  onPageChanged(page: number) {
    this.fetchDemandes(page);
  }
}


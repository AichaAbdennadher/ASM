import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DemandeService } from '../../services/demande-service.service';
import { AuthService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import flatpickr from "flatpickr";

import { StatutService } from '../../services/statut.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent {
 constructor(private demandeService: DemandeService,private statutService: StatutService) {}
showModalSupp: boolean = false;
selectedDemandeId!: number;
selectedStatut: any = {};
  searchText: string = '';
  demandes: any[] = [];
  currentPage = 1;
  totalPages = 1;
  showModal = false;
  isHover = false;
  selectedStatutId: number | null = null;
  statutData: any;
  @ViewChild('datepickerInput') datepickerInput!: ElementRef;
statutsMap: { [id: number]: any } = {};
statuts: any[] = []; // tous les statuts de la base
showUpdateModal = false;
// selectedStatut = { libelle: '', couleur: '#d6672b' };
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

    // Précharger les statuts pour chaque demande
    this.demandes.forEach(demande => {
      if (demande.statutId && !this.statutsMap[demande.statutId]) {
        this.statutService.getStatut(demande.statutId).subscribe({
          next: (res) => {
            this.statutsMap[demande.statutId] = res;
          },
          error: (err) => console.error('Erreur statut', err)
        });
      }
    });
  });
}
// Récupérer tous les statuts disponibles
fetchAllStatuts() {
  this.statutService.getStatuts().subscribe({
    next: (res) => {
      this.statuts = res;
    },
    error: (err) => {
      console.error('Erreur récupération statuts', err);
    }
  });
}
ngOnInit() {
    this.fetchDemandes(this.currentPage);
  const defaultStatutId = 1; // par exemple, l'ID par défaut
    this.getStatutById(defaultStatutId);  }
  onPageChanged(page: number) {
    this.fetchDemandes(page);
      // this.fetchAllStatuts();

  }
  openModalSupp(id: number): void {
  console.log("Statut ID reçu:", id); 
  this.selectedStatutId = id;
  this.showModalSupp = true;
}
supprimerDemande(id: number): void {
  this.demandeService.supprimerDemande(id).subscribe({
    next: () => {
      this.showModalSupp = false;
     this.fetchDemandes(this.currentPage);
    },
    error: (err) => {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  });
}
  getStatutById(id: number) {
    this.statutService.getStatut(id).subscribe({
      next: (res) => {
        this.statutData = res;
        console.log('Statut récupéré:', res);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du statut', err);
      }
    });
  }
closeUpdateModal() {
  this.showUpdateModal = false;
}

 handleUpdate(updatedStatut: any) {
    this.demandeService.updateDemande(updatedStatut.id, updatedStatut).subscribe({
      next: (res) => {
        const index = this.statuts.findIndex(s => s.id === updatedStatut.id);
        if (index !== -1) this.demandes[index] = updatedStatut;

     

        this.closeUpdateModal();
      },
      error: (err) => {

console.log(err)      }
    });
  }


openModalUpdate(id: number, statutId: number) {
  this.selectedDemandeId = id;         // On stocke l’ID
  this.selectedStatut = { id: statutId}; // On garde aussi l'ancien libellé
  this.showUpdateModal = true;
}
}


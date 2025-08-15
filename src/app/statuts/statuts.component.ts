import { Component,OnInit } from '@angular/core';
import { StatutService } from '../../services/statut.service';
// import { NotificationManager } from 'react-notifications'; // si tu utilises un système de notif
@Component({
  selector: 'app-statuts',
  templateUrl: './statuts.component.html',
  styleUrls: ['./statuts.component.css']
})
export class StatutsComponent implements OnInit {
    constructor(private statutService: StatutService) {}
searchText: string = '';
statuts: any[] = [];
currentPage = 1;
totalPages = 1;
showModal = false;
isHover = false;
selectedStatutId: number | null = null;
showModalSupp: boolean = false;
showUpdateModal = false;
selectedStatut = { libelle: '', couleur: '#d6672b' };

openModalSupp(id: number): void {
  console.log("Statut ID reçu:", id); 
  this.selectedStatutId = id;
  this.showModalSupp = true;
}
openModalUpdate(id: number): void {
  console.log("Statut ID reçu:", id); 
  this.selectedStatut = this.statuts.find(s => s.id === id);
  this.showUpdateModal = true;}

closeUpdateModal() {
  this.showUpdateModal = false;
}

 handleUpdate(updatedStatut: any) {
    this.statutService.updateStatut(updatedStatut.id, updatedStatut).subscribe({
      next: (res) => {
        const index = this.statuts.findIndex(s => s.id === updatedStatut.id);
        if (index !== -1) this.statuts[index] = updatedStatut;

     

        this.closeUpdateModal();
      },
      error: (err) => {

console.log(err)      }
    });
  }
supprimerStatut(id: number): void {
  this.statutService.supprimerStatut(id).subscribe({
    next: () => {
      this.showModalSupp = false;
     this.fetchStatuts(this.currentPage);
    },
    error: (err) => {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  });
}
 
openModal() {
    this.showModal = true;
  }

 handleClose() {
    this.showModal = false;
  }
ngOnInit() {
    this.fetchStatuts(this.currentPage);
  }

  fetchStatuts(page: number) {
    this.statutService.getStatuts(page).subscribe(response => {
      this.statuts = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
    });
  }

  onPageChanged(page: number) {
    this.fetchStatuts(page);
  }
 
}

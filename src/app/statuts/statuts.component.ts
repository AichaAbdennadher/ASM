import { Component,OnInit } from '@angular/core';
import { StatutService } from '../../services/statut.service';


@Component({
  selector: 'app-statuts',
  templateUrl: './statuts.component.html',
  styleUrls: ['./statuts.component.css']
})
export class StatutsComponent implements OnInit {
    constructor(private statutService: StatutService) {}
  
statuts: any[] = [];
currentPage = 1;
totalPages = 1;
showModal = false;
isHover = false;
selectedStatutId: number | null = null;
showModalSupp: boolean = false;

openModalSupp(id: number): void {
  console.log("Statut ID reçu:", id); 
  this.selectedStatutId = id;
  this.showModalSupp = true;
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


getStatusColor(status: string ){
  console.log('Statut reçu :', status);
 
  switch (status.toLowerCase()) {
    case 'rouge':
      return '#EF4444';
    case 'jaune':
      return '#FACC15';
    case 'vert':
      return '#22C55E';
    case 'bleu':
      return '#3B82F6';
    case 'gris':
      return '#6B7280';
    case 'orange':
      return '#F97316';
    case 'violet':
      return '#A78BFA';
    case 'rose':
      return '#F472B6';
    case 'marron':
      return '#92400E';
    default:
      return '#9CA3AF'; // gris clair si couleur non reconnue
  }
}

 
}

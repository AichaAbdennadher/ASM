import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatutService } from '../../services/statut.service';
import { DemandeService } from '../../services/demande-service.service';

@Component({
  selector: 'app-update-demande',
  templateUrl: './update-demande.component.html',
  styleUrls: ['./update-demande.component.css']
})
export class UpdateDemandeComponent {
   constructor(private demandeService: DemandeService,private statutService: StatutService) {}
  
    @Input() show: boolean = false;
  @Input() statut: any = { libelle: '', couleur: '#d6672b' };
statuts: any[] = []; // tous les statuts de la base
statutsMap: { [id: number]: any } = {};
  demandes: any[] = [];
  currentPage = 1;
  totalPages = 1
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
@Input() demandeId!: number;
ancienLibelle!: string;
  isHoverSave = false;

  closeModal() {
    this.close.emit();
  }
ngOnInit() {
   this.fetchDemandes(this.currentPage);
  const defaultStatutId = 1; // par exemple, l'ID par défaut
      this.fetchAllStatuts();
        this.ancienLibelle = this.statut.libelle; // Sauvegarde de l'ancien libellé


  }
onSubmit() {
  // statut.id contient maintenant l'ID sélectionné
  this.demandeService.updateDemandeStatut(this.demandeId, this.statut.id).subscribe(
    (res) => {
      console.log('Statut mis à jour', res);
      this.closeModal();
    },
    (err) => {
      console.error('Erreur maj statut', err);
    }
  );
}

fetchAllStatuts() {
  this.statutService.getStatuts().subscribe({
    next: (res) => {
      console.log('Statuts reçus:', res);
      // Si l'API renvoie { data: [...] }
      this.statuts = res.data || [];
    },
    error: (err) => console.error('Erreur récupération statuts', err)
  });
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
}


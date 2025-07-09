import { Component,OnInit } from '@angular/core';
import { StatutService } from '../../services/statut.service';


@Component({
  selector: 'app-statuts',
  templateUrl: './statuts.component.html',
  styleUrls: ['./statuts.component.css']
})
export class StatutsComponent implements OnInit {
  statuts: any[] = [];

  constructor(private statutService: StatutService) {}

  ngOnInit(): void {
    this.fetchStatuts(); //  Appel automatique au démarrage
  }
isHover = false;
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

  fetchStatuts(): void {
    this.statutService.getAllStatuts().subscribe(
      (res: any) => {
        this.statuts = res;
        console.log("statuts =", this.statuts); 
      },
      (error) => {
        console.error("Erreur lors de la récupération des statuts", error);
      }
    );
  }
}

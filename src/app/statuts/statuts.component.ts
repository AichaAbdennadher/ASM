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

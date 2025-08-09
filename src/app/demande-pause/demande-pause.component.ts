import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DemandeService } from '../../services/demande-service.service';
import { AuthService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import flatpickr from "flatpickr";

@Component({
  selector: 'app-demande-pause',
  templateUrl: './demande-pause.component.html',
  styleUrls: ['./demande-pause.component.css']
})

export class DemandePauseComponent{
  constructor(private demandeService: DemandeService) {}

  searchText: string = '';
  demandes: any[] = [];
  currentPage = 1;
  totalPages = 1;
  showModal = false;
  isHover = false;
  selectedStatutId: number | null = null;



  isHoverSave: boolean = false;

openModal() {
    this.showModal = true;
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

  onPageChanged(page: number) {
    this.fetchDemandes(page);
  }
}

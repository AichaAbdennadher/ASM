import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatutService } from '../../services/statut.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-statut',
  templateUrl: './add-statut.component.html',
  styleUrls: ['./add-statut.component.css']
})
export class AddStatutComponent {
    @Output() statutAdded = new EventEmitter<void>(); // ✅

  statut = {
    libelle: '',
    couleur: '#d6672b'
  };
  isHoverSave: boolean = false;
    constructor(
    private statutService: StatutService,
    private toastr: ToastrService
  ) {}

    @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
   selectedColor: string = '#d6672b'; // couleur par défaut
onSubmit(): void {
    this.statutService.ajouterStatut(this.statut).subscribe({
      next: (res) => {
        this.statut = { libelle: '', couleur: '#d6672b' };
        this.close.emit();
        this.statutAdded.emit(); // ✅ notifier le parent
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
 
}

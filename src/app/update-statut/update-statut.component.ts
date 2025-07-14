import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-update-statut',
  templateUrl: './update-statut.component.html',
  styleUrls: ['./update-statut.component.css']
})
export class UpdateStatutComponent {
    @Input() show: boolean = false;
  @Input() statut: any = { libelle: '', couleur: '#d6672b' };

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  isHoverSave = false;

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit(this.statut);
  }

}

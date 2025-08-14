import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-supp-demande',
  templateUrl: './supp-demande.component.html',
  styleUrls: ['./supp-demande.component.css']
})
export class SuppDemandeComponent {
@Input() statutId: number | null = null;
@Output() confirmDelete = new EventEmitter<number>();
@Output() cancel = new EventEmitter<void>();
 isHoverConfirm = false;


confirm() {
  console.log("Confirm clicked, ID:", this.statutId); 
  if (this.statutId !== null) {
    this.confirmDelete.emit(this.statutId);
  }
}
  close() {
    this.cancel.emit();
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppDemandeComponent } from './supp-demande.component';

describe('SuppDemandeComponent', () => {
  let component: SuppDemandeComponent;
  let fixture: ComponentFixture<SuppDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppDemandeComponent]
    });
    fixture = TestBed.createComponent(SuppDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

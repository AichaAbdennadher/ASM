import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDemandeComponent } from './create-demande.component';

describe('CreateDemandeComponent', () => {
  let component: CreateDemandeComponent;
  let fixture: ComponentFixture<CreateDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDemandeComponent]
    });
    fixture = TestBed.createComponent(CreateDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

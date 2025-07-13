import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppStatutComponent } from './supp-statut.component';

describe('SuppStatutComponent', () => {
  let component: SuppStatutComponent;
  let fixture: ComponentFixture<SuppStatutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppStatutComponent]
    });
    fixture = TestBed.createComponent(SuppStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

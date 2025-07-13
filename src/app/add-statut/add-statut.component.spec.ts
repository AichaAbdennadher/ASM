import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatutComponent } from './add-statut.component';

describe('AddStatutComponent', () => {
  let component: AddStatutComponent;
  let fixture: ComponentFixture<AddStatutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStatutComponent]
    });
    fixture = TestBed.createComponent(AddStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

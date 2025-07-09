import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutsComponent } from './statuts.component';

describe('StatutsComponent', () => {
  let component: StatutsComponent;
  let fixture: ComponentFixture<StatutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatutsComponent]
    });
    fixture = TestBed.createComponent(StatutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

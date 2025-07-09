import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePauseComponent } from './demande-pause.component';

describe('DemandePauseComponent', () => {
  let component: DemandePauseComponent;
  let fixture: ComponentFixture<DemandePauseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandePauseComponent]
    });
    fixture = TestBed.createComponent(DemandePauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

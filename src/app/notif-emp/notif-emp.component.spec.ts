import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifEmpComponent } from './notif-emp.component';

describe('NotifEmpComponent', () => {
  let component: NotifEmpComponent;
  let fixture: ComponentFixture<NotifEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifEmpComponent]
    });
    fixture = TestBed.createComponent(NotifEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

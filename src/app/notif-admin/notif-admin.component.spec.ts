import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifAdminComponent } from './notif-admin.component';

describe('NotifAdminComponent', () => {
  let component: NotifAdminComponent;
  let fixture: ComponentFixture<NotifAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifAdminComponent]
    });
    fixture = TestBed.createComponent(NotifAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAdminPage } from './agregar-admin.page';

describe('AgregarAdminPage', () => {
  let component: AgregarAdminPage;
  let fixture: ComponentFixture<AgregarAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

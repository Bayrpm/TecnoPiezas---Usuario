import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegasAgregarPage } from './bodegas-agregar.page';

describe('BodegasAgregarPage', () => {
  let component: BodegasAgregarPage;
  let fixture: ComponentFixture<BodegasAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BodegasAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

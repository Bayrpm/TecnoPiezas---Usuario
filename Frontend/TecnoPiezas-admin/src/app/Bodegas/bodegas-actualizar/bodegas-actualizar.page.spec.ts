import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegasActualizarPage } from './bodegas-actualizar.page';

describe('BodegasActualizarPage', () => {
  let component: BodegasActualizarPage;
  let fixture: ComponentFixture<BodegasActualizarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BodegasActualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

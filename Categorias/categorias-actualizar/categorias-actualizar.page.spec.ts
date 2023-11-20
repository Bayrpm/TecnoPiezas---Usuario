import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasActualizarPage } from './categorias-actualizar.page';

describe('CategoriasActualizarPage', () => {
  let component: CategoriasActualizarPage;
  let fixture: ComponentFixture<CategoriasActualizarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoriasActualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

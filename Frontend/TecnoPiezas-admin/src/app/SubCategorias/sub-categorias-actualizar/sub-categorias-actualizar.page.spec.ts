import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubCategoriasActualizarPage } from './sub-categorias-actualizar.page';

describe('SubCategoriasActualizarPage', () => {
  let component: SubCategoriasActualizarPage;
  let fixture: ComponentFixture<SubCategoriasActualizarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubCategoriasActualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

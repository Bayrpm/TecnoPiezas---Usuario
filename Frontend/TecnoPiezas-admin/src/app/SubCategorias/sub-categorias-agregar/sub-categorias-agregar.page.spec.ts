import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubCategoriasAgregarPage } from './sub-categorias-agregar.page';

describe('SubCategoriasAgregarPage', () => {
  let component: SubCategoriasAgregarPage;
  let fixture: ComponentFixture<SubCategoriasAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubCategoriasAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

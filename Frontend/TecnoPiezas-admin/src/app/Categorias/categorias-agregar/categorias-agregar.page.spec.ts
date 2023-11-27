import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasAgregarPage } from './categorias-agregar.page';

describe('CategoriasAgregarPage', () => {
  let component: CategoriasAgregarPage;
  let fixture: ComponentFixture<CategoriasAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoriasAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasLeerPage } from './categorias-leer.page';

describe('CategoriasLeerPage', () => {
  let component: CategoriasLeerPage;
  let fixture: ComponentFixture<CategoriasLeerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoriasLeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubCategoriasLeerPage } from './sub-categorias-leer.page';

describe('SubCategoriasLeerPage', () => {
  let component: SubCategoriasLeerPage;
  let fixture: ComponentFixture<SubCategoriasLeerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubCategoriasLeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

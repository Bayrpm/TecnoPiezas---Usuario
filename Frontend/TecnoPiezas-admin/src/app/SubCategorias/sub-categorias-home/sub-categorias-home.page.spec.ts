import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubCategoriasHomePage } from './sub-categorias-home.page';

describe('SubCategoriasHomePage', () => {
  let component: SubCategoriasHomePage;
  let fixture: ComponentFixture<SubCategoriasHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubCategoriasHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasHomePage } from './categorias-home.page';

describe('CategoriasHomePage', () => {
  let component: CategoriasHomePage;
  let fixture: ComponentFixture<CategoriasHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoriasHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

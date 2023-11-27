import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosLeerPage } from './productos-leer.page';

describe('ProductosLeerPage', () => {
  let component: ProductosLeerPage;
  let fixture: ComponentFixture<ProductosLeerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductosLeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

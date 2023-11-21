import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosActualizarPage } from './productos-actualizar.page';

describe('ProductosActualizarPage', () => {
  let component: ProductosActualizarPage;
  let fixture: ComponentFixture<ProductosActualizarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductosActualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

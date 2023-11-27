import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosHomePage } from './productos-home.page';

describe('ProductosHomePage', () => {
  let component: ProductosHomePage;
  let fixture: ComponentFixture<ProductosHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductosHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

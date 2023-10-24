import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegasLeerPage } from './bodegas-leer.page';

describe('BodegasLeerPage', () => {
  let component: BodegasLeerPage;
  let fixture: ComponentFixture<BodegasLeerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BodegasLeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

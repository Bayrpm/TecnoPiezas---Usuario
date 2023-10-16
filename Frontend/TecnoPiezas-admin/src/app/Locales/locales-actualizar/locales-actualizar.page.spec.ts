import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalesActualizarPage } from './locales-actualizar.page';

describe('LocalesActualizarPage', () => {
  let component: LocalesActualizarPage;
  let fixture: ComponentFixture<LocalesActualizarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalesActualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LocalesLeerPage } from './locales-leer.page';

describe('LocalesLeerPage', () => {
  let component: LocalesLeerPage;
  let fixture: ComponentFixture<LocalesLeerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalesLeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalesHomePage } from './locales-home.page';

describe('LocalesHomePage', () => {
  let component: LocalesHomePage;
  let fixture: ComponentFixture<LocalesHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalesHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

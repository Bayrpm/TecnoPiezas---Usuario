import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegasHomePage } from './bodegas-home.page';

describe('BodegasHomePage', () => {
  let component: BodegasHomePage;
  let fixture: ComponentFixture<BodegasHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BodegasHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

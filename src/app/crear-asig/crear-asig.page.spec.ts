import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearAsigPage } from './crear-asig.page';

describe('CrearAsigPage', () => {
  let component: CrearAsigPage;
  let fixture: ComponentFixture<CrearAsigPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAsigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

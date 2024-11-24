import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaseQRPage } from './clase-qr.page';

describe('ClaseQRPage', () => {
  let component: ClaseQRPage;
  let fixture: ComponentFixture<ClaseQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

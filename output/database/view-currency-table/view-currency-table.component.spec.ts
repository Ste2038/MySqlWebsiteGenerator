import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCurrencyTableComponent } from './view-currency-table.component';

describe('ViewCurrencyTableComponent', () => {
  let component: ViewCurrencyTableComponent;
  let fixture: ComponentFixture<ViewCurrencyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCurrencyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCurrencyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransazioniTableComponent } from './view-transazioni-table.component';

describe('ViewTransazioniTableComponent', () => {
  let component: ViewTransazioniTableComponent;
  let fixture: ComponentFixture<ViewTransazioniTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransazioniTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTransazioniTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRicorrentiTableComponent } from './view-ricorrenti-table.component';

describe('ViewRicorrentiTableComponent', () => {
  let component: ViewRicorrentiTableComponent;
  let fixture: ComponentFixture<ViewRicorrentiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRicorrentiTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRicorrentiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

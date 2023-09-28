import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUtentiTableComponent } from './view-utenti-table.component';

describe('ViewUtentiTableComponent', () => {
  let component: ViewUtentiTableComponent;
  let fixture: ComponentFixture<ViewUtentiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUtentiTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUtentiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

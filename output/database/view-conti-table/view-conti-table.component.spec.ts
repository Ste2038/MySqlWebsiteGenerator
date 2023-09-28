import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContiTableComponent } from './view-conti-table.component';

describe('ViewContiTableComponent', () => {
  let component: ViewContiTableComponent;
  let fixture: ComponentFixture<ViewContiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContiTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewContiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

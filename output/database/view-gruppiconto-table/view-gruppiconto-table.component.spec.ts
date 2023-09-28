import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGruppiContoTableComponent } from './view-gruppiconto-table.component';

describe('ViewGruppiContoTableComponent', () => {
  let component: ViewGruppiContoTableComponent;
  let fixture: ComponentFixture<ViewGruppiContoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGruppiContoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGruppiContoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

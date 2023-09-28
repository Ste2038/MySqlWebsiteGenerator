import { ComponentFixture, TestBed } from '@angular/core/testing';

import { View$[UC_name]TableComponent } from './view-$[LC_name]-table.component';

describe('View$[UC_name]TableComponent', () => {
  let component: View$[UC_name]TableComponent;
  let fixture: ComponentFixture<View$[UC_name]TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ View$[UC_name]TableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(View$[UC_name]TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

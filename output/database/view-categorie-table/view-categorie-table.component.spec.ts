import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategorieTableComponent } from './view-categorie-table.component';

describe('ViewCategorieTableComponent', () => {
  let component: ViewCategorieTableComponent;
  let fixture: ComponentFixture<ViewCategorieTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCategorieTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCategorieTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

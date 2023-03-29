import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignsListingComponent } from './designs-listing.component';

describe('DesignsListingComponent', () => {
  let component: DesignsListingComponent;
  let fixture: ComponentFixture<DesignsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

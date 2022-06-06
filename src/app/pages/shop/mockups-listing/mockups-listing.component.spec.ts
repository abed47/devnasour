import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupsListingComponent } from './mockups-listing.component';

describe('MockupsListingComponent', () => {
  let component: MockupsListingComponent;
  let fixture: ComponentFixture<MockupsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockupsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockupsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDimentionalListingComponent } from './three-dimentional-listing.component';

describe('ThreeDimentionalListingComponent', () => {
  let component: ThreeDimentionalListingComponent;
  let fixture: ComponentFixture<ThreeDimentionalListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeDimentionalListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDimentionalListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupViewComponent } from './mockup-view.component';

describe('MockupViewComponent', () => {
  let component: MockupViewComponent;
  let fixture: ComponentFixture<MockupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockupViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

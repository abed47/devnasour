import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTrendingComponent } from './shop-trending.component';

describe('ShopTrendingComponent', () => {
  let component: ShopTrendingComponent;
  let fixture: ComponentFixture<ShopTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopTrendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

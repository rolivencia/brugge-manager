import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CouponGridComponent } from "./coupon-grid.component";

describe("CouponGridComponent", () => {
  let component: CouponGridComponent;
  let fixture: ComponentFixture<CouponGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CouponGridComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReportRedeemedCouponsComponent } from "./report-redeemed-coupons.component";

describe("ReportRedeemedCouponsComponent", () => {
  let component: ReportRedeemedCouponsComponent;
  let fixture: ComponentFixture<ReportRedeemedCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportRedeemedCouponsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRedeemedCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from "@angular/core/testing";

import { RedeemCouponService } from "./redeem-coupon.service";

describe("RedeemCouponService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: RedeemCouponService = TestBed.get(RedeemCouponService);
    expect(service).toBeTruthy();
  });
});

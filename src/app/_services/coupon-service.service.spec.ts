import { TestBed } from "@angular/core/testing";

import { CouponServiceService } from "./coupon-service.service";

describe("CouponServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CouponServiceService = TestBed.get(CouponServiceService);
    expect(service).toBeTruthy();
  });
});

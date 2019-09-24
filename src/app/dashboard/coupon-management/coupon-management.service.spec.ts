import { TestBed } from "@angular/core/testing";

import { CouponManagementService } from "./coupon-management.service";

describe("CouponManagementService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CouponManagementService = TestBed.get(
      CouponManagementService
    );
    expect(service).toBeTruthy();
  });
});

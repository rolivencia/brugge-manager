import { TestBed } from "@angular/core/testing";

import { ReportRedeemedCouponsService } from "./report-redeemed-coupons.service";

describe("ReportRedeemedCouponsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ReportRedeemedCouponsService = TestBed.get(
      ReportRedeemedCouponsService
    );
    expect(service).toBeTruthy();
  });
});

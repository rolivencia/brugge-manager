import { TestBed } from "@angular/core/testing";

import { MobileDashboardService } from "./mobile-dashboard.service";

describe("MobileDashboardService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MobileDashboardService = TestBed.get(MobileDashboardService);
    expect(service).toBeTruthy();
  });
});

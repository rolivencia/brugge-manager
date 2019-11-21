import { TestBed } from "@angular/core/testing";

import { ReportManagementService } from "./report-management.service";

describe("ReportManagementService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ReportManagementService = TestBed.get(
      ReportManagementService
    );
    expect(service).toBeTruthy();
  });
});

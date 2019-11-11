import { TestBed } from "@angular/core/testing";

import { RecommendedManagementService } from "./recommended-management.service";

describe("RecommendedManagementService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: RecommendedManagementService = TestBed.get(
      RecommendedManagementService
    );
    expect(service).toBeTruthy();
  });
});

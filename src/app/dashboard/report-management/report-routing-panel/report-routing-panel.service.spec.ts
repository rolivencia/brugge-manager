import { TestBed } from "@angular/core/testing";

import { ReportRoutingPanelService } from "./report-routing-panel.service";

describe("ReportRoutingPanelService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ReportRoutingPanelService = TestBed.get(
      ReportRoutingPanelService
    );
    expect(service).toBeTruthy();
  });
});

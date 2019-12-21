import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReportRoutingPanelComponent } from "./report-routing-panel.component";

describe("ReportRoutingPanelComponent", () => {
  let component: ReportRoutingPanelComponent;
  let fixture: ComponentFixture<ReportRoutingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportRoutingPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRoutingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

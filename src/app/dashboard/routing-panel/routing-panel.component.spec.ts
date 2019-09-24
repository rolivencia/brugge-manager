import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RoutingPanelComponent } from "./routing-panel.component";

describe("RoutingPanelComponent", () => {
  let component: RoutingPanelComponent;
  let fixture: ComponentFixture<RoutingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoutingPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

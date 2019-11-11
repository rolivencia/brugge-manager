import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RecommendedManagementComponent } from "./recommended-management.component";

describe("RecommendedManagementComponent", () => {
  let component: RecommendedManagementComponent;
  let fixture: ComponentFixture<RecommendedManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedManagementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RecommendedGridComponent } from "./recommended-grid.component";

describe("RecommendedGridComponent", () => {
  let component: RecommendedGridComponent;
  let fixture: ComponentFixture<RecommendedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedGridComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

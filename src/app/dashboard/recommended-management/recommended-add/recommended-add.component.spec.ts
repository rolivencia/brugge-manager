import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RecommendedAddComponent } from "./recommended-add.component";

describe("RecommendedAddComponent", () => {
  let component: RecommendedAddComponent;
  let fixture: ComponentFixture<RecommendedAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

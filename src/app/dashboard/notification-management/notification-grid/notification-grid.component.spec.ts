import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NotificationGridComponent } from "./notification-grid.component";

describe("NotificationGridComponent", () => {
  let component: NotificationGridComponent;
  let fixture: ComponentFixture<NotificationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationGridComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

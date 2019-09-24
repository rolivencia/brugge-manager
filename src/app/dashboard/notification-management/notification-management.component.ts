import { Component, OnInit } from "@angular/core";
import { NotificationManagementService } from "@app/dashboard/notification-management/notification-management.service";

@Component({
  selector: "app-notification-management",
  templateUrl: "./notification-management.component.html",
  styleUrls: ["./notification-management.component.scss"]
})
export class NotificationManagementComponent implements OnInit {
  constructor(
    public notificationManagementService: NotificationManagementService
  ) {}

  ngOnInit() {}
}

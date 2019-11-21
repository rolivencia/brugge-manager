import { Component, OnInit } from "@angular/core";
import { NotificationManagementService } from "@app/dashboard/notification-management/notification-management.service";

@Component({
  selector: "app-notification-grid",
  templateUrl: "./notification-grid.component.html",
  styleUrls: [
    "./notification-grid.component.scss",
    "../notification-management.component.scss"
  ]
})
export class NotificationGridComponent implements OnInit {
  constructor(
    public notificationManagementService: NotificationManagementService
  ) {}

  ngOnInit() {}

  getNotificationDetails() {}
}

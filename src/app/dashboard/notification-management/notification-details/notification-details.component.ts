import { Component, OnInit } from "@angular/core";
import {NotificationManagementService} from "@app/dashboard/notification-management/notification-management.service";

@Component({
  selector: "app-notification-details",
  templateUrl: "./notification-details.component.html",
  styleUrls: ["./notification-details.component.scss", "../notification-management.component.scss"]
})
export class NotificationDetailsComponent implements OnInit {
  constructor(public notificationManagementService: NotificationManagementService) {}

  ngOnInit() {}
}

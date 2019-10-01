import { Injectable } from "@angular/core";
import { NotificationService } from "@app/_services/notification.service";

@Injectable({
  providedIn: "root"
})
export class NotificationManagementService {
  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  constructor(public notificationService: NotificationService) {}

  goToSend() {
    this.showTopOutlet = true;
    this.showLeftOutlet = false;
    this.showRightOutlet = false;
  }

  send(notification: Notification) {}

  get = () => {};
}

export class Notification {}

import { Injectable } from "@angular/core";
import { NotificationService } from "@app/_services/notification.service";
import { CollectionView } from "wijmo/wijmo";

@Injectable({
  providedIn: "root"
})
export class NotificationManagementService {
  gridCollection: CollectionView;

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

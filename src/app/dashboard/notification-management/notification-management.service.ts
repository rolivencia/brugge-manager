import { Injectable } from "@angular/core";
import { NotificationService } from "@app/_services/notification.service";
import { CollectionView } from "wijmo/wijmo";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class NotificationManagementService {
  gridCollection: CollectionView;

  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  constructor(
    public notificationService: NotificationService,
    private location: Location
  ) {}

  goToSend() {
    this.showTopOutlet = true;
    this.showLeftOutlet = false;
    this.showRightOutlet = false;
    this.location.go(
      "https://app.onesignal.com/apps/4a964c0f-a974-493d-bde6-2b3d784828fc/notifications/new"
    );
  }

  send(notification: Notification) {}

  get = () => {};
}

export class Notification {}

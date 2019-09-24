import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationManagementService {

  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  constructor() { }

  goToSend(){
    this.showTopOutlet = true;
    this.showLeftOutlet = false;
    this.showRightOutlet = false;
  }

  send(notification: Notification){

  }
}

export class Notification{

}

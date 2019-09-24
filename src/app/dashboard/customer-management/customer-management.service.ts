import { Injectable } from '@angular/core';
import {Customer} from "@app/_models";

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  constructor() { }

  disable(customer: Customer){

  }

  sendNotification(customer: Customer){

  }
}

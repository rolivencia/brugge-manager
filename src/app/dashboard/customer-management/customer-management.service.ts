import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  constructor() { }
}

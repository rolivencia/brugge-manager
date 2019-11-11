import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RecommendedManagementService {
  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  selectedRecommended: Recommended = null;

  constructor() {}

  public toggleAdd() {
    this.showTopOutlet = true;
    this.showLeftOutlet = false;
    this.showRightOutlet = false;
    this.selectedRecommended = null;

    // this.router.navigate(['/dashboard/coupons/add']);
  }

  remove(recommended: Recommended) {}

  update(recommended: Recommended) {}
}

export class Recommended {
  public id: number;
  public name: string;
}

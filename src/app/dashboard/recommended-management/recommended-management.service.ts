import { Injectable } from "@angular/core";
import { CollectionView } from "wijmo/wijmo";
import { Recommended } from "@app/_models/recommended";
import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class RecommendedManagementService {
  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  selectedRecommended: Recommended = null;
  recommendations: Recommended[] = [];
  gridCollection: CollectionView;

  constructor() {}

  public toggleAdd() {
    this.showTopOutlet = true;
    this.showLeftOutlet = false;
    this.showRightOutlet = false;
    this.selectedRecommended = null;

    // this.router.navigate(['/dashboard/coupons/add']);
  }

  public showGrid() {
    this.showTopOutlet = false;
    this.showLeftOutlet = true;
    this.showRightOutlet = true;
  }

  remove(recommended: Recommended) {}

  update(recommendation: Recommended) {
    this.selectedRecommended = _.cloneDeep(recommendation);
    this.showTopOutlet = true;
    this.showLeftOutlet = false;
    this.showRightOutlet = false;
  }
}

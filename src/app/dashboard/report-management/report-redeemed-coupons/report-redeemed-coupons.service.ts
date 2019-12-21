import { Injectable } from "@angular/core";
import { CollectionView } from "wijmo/wijmo";

@Injectable({
  providedIn: "root"
})
export class ReportRedeemedCouponsService {
  gridCollection: CollectionView;
  redeemed = [];

  constructor() {}
}

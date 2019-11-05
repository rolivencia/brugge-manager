import { Injectable } from "@angular/core";
import { RouteCard } from "@app/_models";

@Injectable({
  providedIn: "root"
})
export class MobileDashboardService {
  private _routes: RouteCard[] = [
    {
      route: "redeem-coupon",
      text: "Canje de cupones con scanner QR",
      title: "📷 Escaner QR",
      visibility: "d-inline d-lg-none",
      roles: [1, 2]
    }
  ];

  constructor() {}

  get routes(): RouteCard[] {
    return this._routes;
  }

  set routes(value: RouteCard[]) {
    this._routes = value;
  }
}

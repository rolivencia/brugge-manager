import { Injectable } from "@angular/core";
import { RouteCard } from "@app/_models";

@Injectable({
  providedIn: "root"
})
export class MobileDashboardService {
  private _routes: RouteCard[] = [
    {
      route: "redeem-coupon",
      text: "Escaneo y canje de cupones de clientes",
      title: "📷 Escaner QR",
      visibility: "d-inline d-lg-none"
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

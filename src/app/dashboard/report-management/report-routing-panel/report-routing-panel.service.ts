import { Injectable } from "@angular/core";
import { RoutingPanel } from "@app/_interfaces/routing-panel.interface";
import { RouteCard } from "@app/_models";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ReportRoutingPanelService implements RoutingPanel {
  get routes(): RouteCard[] {
    return this._routes;
  }

  set routes(value: RouteCard[]) {
    this._routes = value;
  }

  _routes: RouteCard[] = [
    {
      route: "dashboard/reports/redeemed-coupons",
      text: "Reporte de cupones canjeados por día o en un intervalo de días.",
      title: "🎫 Cupones canjeados",
      visibility: "d-inline",
      roles: [1, 2]
    }
  ];

  constructor(private router: Router) {}

  navigate(routeCard: RouteCard) {
    this.router.navigate([`/${routeCard.route}`]);
  }

  goBack() {
    this.router.navigate([`/dashboard/reports`]);
  }
}

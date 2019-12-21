import { Injectable } from "@angular/core";
import { RouteCard } from "@app/_models";
import { RoutingPanel } from "@app/_interfaces/routing-panel.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RoutingPanelService implements RoutingPanel {
  _routes: RouteCard[] = [
    {
      route: "dashboard/mobile/redeem-coupon",
      text: "Canje de cupones con scanner QR",
      title: "📷 Escaner QR",
      visibility: "d-inline d-lg-none",
      roles: [1, 2]
    },
    //  TODO: Descomentar y corregir cuando haya más módulos disponibles para gestión mobile.
    // {
    //   routeCard: "dashboard/mobile",
    //   text: "Ingresar para tareas de gestión desde el móvil",
    //   title: "📱 Gestión Móvil",
    //   visibility: "d-inline d-lg-none",
    //   roles: [1, 2]
    // },
    {
      route: "dashboard/coupons",
      text: "Ingresar al menú de gestión de cupones de Brugge",
      title: "🎫 Gestión de Cupones",
      visibility: "d-none d-lg-inline",
      roles: [1]
    },
    {
      route: "dashboard/recommended",
      text: "Ingresar al menú de gestión de recomendados",
      title: "🍕 Gestión de Recomendados",
      visibility: "d-none d-lg-inline",
      roles: [1]
    },
    {
      route: "dashboard/customer",
      text: "Ingresar al menú de gestión de Clientes",
      title: "👥 Gestión de Clientes",
      visibility: "d-none d-lg-inline",
      roles: [1]
    },
    {
      route: "dashboard/notification",
      text: "Ingresar al menú de envío de Notificaciones",
      title: "📣 Envío de Notificaciones",
      visibility: "d-none d-lg-inline",
      roles: [1]
    },
    {
      route: "dashboard/reports",
      text: "Consulta de reportes generados",
      title: "📰 Reportes",
      visibility: "d-none d-lg-inline",
      roles: [1]
    }
  ];

  constructor(private router: Router) {}

  get routes(): RouteCard[] {
    return this._routes;
  }

  set routes(value: RouteCard[]) {
    this._routes = value;
  }

  navigate(routeCard: RouteCard) {
    this.router.navigate([`/${routeCard.route}`]);
  }
}

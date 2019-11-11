import { Injectable } from "@angular/core";
import { RouteCard } from "@app/_models";

@Injectable({
  providedIn: "root"
})
export class RoutingPanelService {
  private _routes: RouteCard[] = [
    {
      route: "dashboard/mobile",
      text: "Ingresar para tareas de gestión desde el móvil",
      title: "📱 Gestión Móvil",
      visibility: "d-inline d-lg-none",
      roles: [1, 2]
    },
    {
      route: "dashboard/coupons",
      text: "Ingresar al menú de gestión de cupones de Brugge",
      title: "🎫 Gestión de Cupones",
      visibility: "d-inline",
      roles: [1]
    },
    {
      route: "dashboard/recommended",
      text: "Ingresar al menú de gestión de recomendados",
      title: "🍕 Gestión de Recomendados",
      visibility: "d-inline",
      roles: [1]
    },
    {
      route: "dashboard/customer",
      text: "Ingresar al menú de gestión de Clientes",
      title: "👥 Gestión de Clientes",
      visibility: "d-inline",
      roles: [1]
    },
    {
      route: "dashboard/notification",
      text: "Ingresar al menú de envío de Notificaciones",
      title: "📣 Envío de Notificaciones",
      visibility: "d-inline",
      roles: [1]
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

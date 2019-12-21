import { RouteCard } from "@app/_models";

export interface RoutingPanel {
  _routes: RouteCard[];

  navigate(routeCard: RouteCard);
}

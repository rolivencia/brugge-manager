import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login";
import { AuthGuard } from "./_guards";

const appRoutes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("app/dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },

  // otherwise redirect to dashboard
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "dashboard" }
];

export const routing = RouterModule.forRoot(appRoutes);

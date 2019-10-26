import { Component, OnInit } from "@angular/core";
import { MobileDashboardService } from "@app/dashboard/mobile-management/mobile-dashboard/mobile-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-mobile-dashboard",
  templateUrl: "./mobile-dashboard.component.html",
  styleUrls: ["./mobile-dashboard.component.scss"]
})
export class MobileDashboardComponent implements OnInit {
  constructor(
    public mobileDashboardService: MobileDashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  goTo(route: string) {
    this.router.navigate([`../${route}`], { relativeTo: this.route });
  }
}

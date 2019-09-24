import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./_services";
import * as wjcCore from "wijmo/wijmo";

wjcCore.setLicenseKey(
  "988775697861712#B05eulUMp9WMJh6T0VUS5BTQCF6RrcWWhRXSGp7Rp94RwVHUrkVM5UETUtSR6QkYZN7YvxWMXRlaOBXNqN5b9UkUhlHMR56YCBlN4N7ZykHbQJje6AVdrBlRZJld994NlRXVKZkTuhGSyF7LwUDe9gmWvJWcCtiTygVcxMVQF5mcYBDR6o7TJVmYQZGMnVUeMtkcQNEM0tESytkUWBje6VHRHdTRqh7YxRXazlles3CbmdkUxYmY6MVRUZlQjFGW0ZmYVBDOslTZ5Q4S9AnYK36TwR7d4kmMjJFc7UmThpHTHF4RWdzUXJiOiMlIsIiRzEjRzIjQiojIIJCL6gTN6QzN4kDO0IicfJye#4Xfd5nIzMEMCJiOiMkIsISZy36Qg2Wbql6ViojIOJyebpjIkJHUiwiI8AzN4QDMgETMyEDOxAjMiojI4J7QiwiIDxETgE6cl5EbhV7cpZlI0ISYONkIsIiMxcTM6gzN9YTN7cDO8kjI0ICZJJCL3JyM6hTMwIjI0IiclZnIsU6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3EUTzglWslXd4YTWQtGdndjerEkZhdVW8dkY5B5UWx6Z4JEbW54bulnTxIFaWZkNHRnewJDeqZWWZdTU7d6aL36Q4tiWTFDTMhEOM3EWx3yRztGSIZVTtN5VxokNkB5Q6YHeEBHOltibl3EZ5RqQwR"
);

@Component({
  selector: "app-ceut-frsf",
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService
      .getKeys("wijmo")
      .subscribe(Key => wjcCore.setLicenseKey(Key));
  }
}

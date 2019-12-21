import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ReportManagementService {
  gridCollection: any;
  reportName = "Gestión de Reportes";

  constructor(private http: HttpClient) {}

  get() {}
}

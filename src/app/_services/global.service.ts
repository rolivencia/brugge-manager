import { Injectable } from "@angular/core";
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  private _httpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  private _webApiUrl = ``;

  constructor() {}

  get httpHeaders(): HttpHeaders {
    return this._httpHeaders;
  }

  set httpHeaders(value: HttpHeaders) {
    this._httpHeaders = value;
  }

  get webApiUrl(): string {
    return this._webApiUrl;
  }

  set webApiUrl(value: string) {
    this._webApiUrl = value;
  }

  /**
   * Genera un orden aleatorio
   */
  shuffleOrder(): number {
    return 0.5 - Math.random();
  }

  parseCode(code: string) {
    const object = JSON.parse(code);
    return { idCustomer: object.idCustomer, idCoupon: object.idCoupon };
  }

  isValidJson(text) {
    return /^[\],:{}\s]*$/.test(
      text
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    );
  }
}

import { Audit } from "@app/_models/audit";
import * as moment from "moment";

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  uidFirebase: string;
  audit: Audit;

  constructor(customerRaw) {
    this.id = customerRaw.id;
    this.firstName = customerRaw.firstName;
    this.lastName = customerRaw.lastName;
    this.email = customerRaw.email;
    this.uidFirebase = customerRaw.uidFirebase;
    this.audit = customerRaw.audit;

    this.audit.createdAt = moment(customerRaw.audit.createdAt);
    this.audit.updatedAt = moment(customerRaw.audit.updatedAt);
  }
}

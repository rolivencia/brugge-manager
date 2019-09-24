import { Audit } from "@app/_models/audit";

export class Customer{
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  avatar: string;
  audit: Audit;

  constructor(){

  }
}

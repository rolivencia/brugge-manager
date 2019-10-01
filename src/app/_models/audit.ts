import { Moment } from "moment";

export class Audit {
  deleted: boolean;
  enabled: boolean;
  createdAt: Moment | string;
  updatedAt: Moment | string;

  constructor() {}
}

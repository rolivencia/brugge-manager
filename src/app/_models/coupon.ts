import { Moment } from "moment";
import { Audit } from "@app/_models/audit";
import { User } from "@app/_models/user";

export class Coupon {
  id: number;
  title: string;
  startsAt: Moment;
  endsAt: Moment;
  description: string;
  type: CouponType;
  code: string;
  imageUrl: string;
  dailyCoupon: boolean;
  audit: Audit;
  user: User;

  constructor() {}
}

export class CouponType {
  id: number;
  description: string;
  // deleted: boolean;
  // enabled: boolean;
  // createdAt: string;
  // updatedAt: string;
  //TODO: Adjust how audit is used in this class, retrieving data correctly from server
  // audit?: Audit;
}

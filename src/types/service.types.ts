import { UserType } from "./user.types";

export type SaleType = {
  id: number;
  user: UserType;
  point: number;
  method: number;
  createdAt: Date | string;
  paymentType: number;
};

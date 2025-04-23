import { UserType } from "./user.types";

export type RequestType = {
  id: number;
  service: number;
  area?: number;
  brand?: string;
  status: number;
};

export type SaleType = {
  id: number;
  user: UserType;
  point: number;
  createdAt: Date | string;
  request: RequestType;

  paymentType: number;
};

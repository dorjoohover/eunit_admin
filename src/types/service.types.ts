import { UserType } from "./user.types";

export type ServiceType = {
  id: number;
  user: UserType;
  price: number;
  method: number;
  date: Date | string;
  type: number;
};

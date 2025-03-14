export type UserType = {
  id: number;
  email: string;
  name?: string;
  firstname?: string;
  lastname?: string;
  profile?: string;
  phone?: string;
  endDate?: Date;
  birthdate?: string;
  createdAt: Date | string;
  role: number;
  wallet: number;
  status?: number;
  phoneStatus?: number;
  emailStatus?: number;
};

import { apiService } from "@/services";
import { ApiResponseType, SearchParamsFilterType, SaleType } from "@/types";

export async function getSales(
  filter: SearchParamsFilterType,
  all = 0
): Promise<ApiResponseType<SaleType[]>> {
  return apiService.getList<SaleType[]>(`/payment/transactions/${all}`, filter);
}

export async function getSale<SaleType>(id: string) {
  const res = await apiService.getOne<SaleType>(`/product/bo`, { id });
  return res.data;
}

export async function createuser<SaleType>(data: SaleType) {
  return await apiService.create<SaleType, SaleType>(`/product/bo`, data);
}

export async function updateUser<SaleType>(data: SaleType, id: string) {
  return await apiService.update<SaleType, SaleType>(`/product/bo`, {
    id: id,
    data: data,
  });
}

export async function deleteUser<SaleType>(id: string) {
  return await apiService.delete<SaleType>(`/product/bo`, { id });
}

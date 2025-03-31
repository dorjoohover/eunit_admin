import { apiService } from "@/services";
import { ApiResponseType, SearchParamsFilterType, ServiceType } from "@/types";

export async function getSales(
  filter: SearchParamsFilterType,
  all = 0
): Promise<ApiResponseType<ServiceType[]>> {
  return apiService.getList<ServiceType[]>(
    `/payment/transactions/${all}`,
    filter
  );
}

export async function getSale<ServiceType>(id: string) {
  const res = await apiService.getOne<ServiceType>(`/product/bo`, { id });
  return res.data;
}

export async function createuser<ServiceType>(data: ServiceType) {
  return await apiService.create<ServiceType, ServiceType>(`/product/bo`, data);
}

export async function updateUser<ServiceType>(data: ServiceType, id: string) {
  return await apiService.update<ServiceType, ServiceType>(`/product/bo`, {
    id: id,
    data: data,
  });
}

export async function deleteUser<ServiceType>(id: string) {
  return await apiService.delete<ServiceType>(`/product/bo`, { id });
}

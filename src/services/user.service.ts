import { apiService } from "@/services";
import { ApiResponseType, SearchParamsFilterType, UserType } from "@/types";

export async function getUsers(
  filter: SearchParamsFilterType
): Promise<ApiResponseType<UserType[]>> {
  return apiService.getList<UserType[]>("/user", filter);
}

export async function getUser<UserType>(id: string) {
  const res = await apiService.getOne<UserType>(`/product/bo`, { id });
  return res.data;
}

export async function createuser<UserType>(data: UserType) {
  return await apiService.create<UserType, UserType>(`/product/bo`, data);
}

export async function updateUser<UserType>(data: UserType, id: string) {
  return await apiService.update<UserType, UserType>(`/product/bo`, {
    id: id,
    data: data,
  });
}

export async function deleteUser<UserType>(id: string) {
  return await apiService.delete<UserType>(`/product/bo`, { id });
}

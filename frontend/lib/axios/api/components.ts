import { Component } from "@/lib/types/api/components.type";
import api from "../axios";
import { Filters } from "@/store/componentStore";

export const fetchComponents = async (
  page?: number,
  limit?: number,
  filters?: Filters,
): Promise<Component[]> => {
  const params = new URLSearchParams();

  if (page !== undefined) params.append("page", page.toString());
  if (limit !== undefined) params.append("limit", limit.toString());
  if (filters?.category)
    params.append("categories", filters.category.id.toString());

  const url = `/components?${params.toString()}`;
  const response = await api.get<Component[]>(url);
  return response.data;
};

export const createComponent = async (data: FormData): Promise<Component> => {
  const response = await api.post<Component>("/components", data);
  return response.data;
}
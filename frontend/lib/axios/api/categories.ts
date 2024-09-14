import api from "../axios";
import { Categories } from "@/lib/types/api/categories.type";

export const getCategories = async (): Promise<Categories[]> => {
  const response = await api.get<Categories[]>("/categories");
  return response.data;
};

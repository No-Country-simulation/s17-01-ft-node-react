import { Plans } from "@/lib/types/api/plans";
import api from "../axios";

export const getPlans = async (): Promise<Plans[]> => {
    const response = await api.get<Plans[]>("/plans");
    return response.data;
}
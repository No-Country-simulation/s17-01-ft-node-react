import { Component } from "@/lib/types/api/components.type"
import api from "../axios"

export const componentById = async (id: number): Promise<Component> => {
const response = await api.get<Component>(`/components/${id}`)

// console.log(response);


return response.data
}


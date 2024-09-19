import { Component } from "@/lib/types/api/components.type";
import api from "../axios";

export const componentById = async (id: number): Promise<Component> => {
  try {
    const response = await api.get<Component>(`/components/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error al obtener el componente:", error);
    throw error; // Considera manejar el error adecuadamente aquí
  }
};

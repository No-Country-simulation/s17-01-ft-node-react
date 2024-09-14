import { Component } from "@/lib/types/api/components.type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Filters {
  category: { id: number; name: string } | undefined;
  subcategory: string | number | undefined;
  raiting: string | number | undefined;
  name: string | undefined;
}

interface FilterState {
  filters: Filters;
  setCategory: (category: { id: number; name: string } | undefined) => void;
  setSubcategory: (subcategory: string | number | undefined) => void;
  setRaiting: (raiting: string | number | undefined) => void;
  setSearchName: (name: string | undefined) => void;
}

export const useFilterComponentStore = create<FilterState>()(
  devtools(
    (set) => ({
      filters: {
        category: undefined,
        subcategory: undefined,
        raiting: undefined,
        name: undefined,
      },
      setCategory: (category) =>
        set((state) => ({ filters: { ...state.filters, category } })),
      setSubcategory: (subcategory) =>
        set((state) => ({ filters: { ...state.filters, subcategory } })),
      setRaiting: (raiting) =>
        set((state) => ({ filters: { ...state.filters, raiting } })),
      setSearchName: (name) =>
        set((state) => ({ filters: { ...state.filters, name } })),
    }),
    { name: "FilterStore" },
  ),
);

export interface ComponentState {
  components: Component[];
  allComponents: Component[];
  setComponents: (components: Component[]) => void;
  setAllComponents: (components: Component[]) => void;
  filterComponents: (name: string) => void;
}

export const useComponentStore = create<ComponentState>()(
  devtools(
    (set) => ({
      components: [],
      allComponents: [],
      setComponents: (components) => set({ components }),
      setAllComponents: (components) => set({ allComponents: components }),
      filterComponents: (name) =>
        set((state) => {
          console.log("Filtrando componentes con nombre:", name);
          console.log("Componentes antes de filtrar:", state.allComponents);

          const filteredComponents = state.allComponents.filter((component) =>
            component.name.toLowerCase().includes(name.toLowerCase()),
          );

          console.log("Componentes filtrados:", filteredComponents);

          useCurrentPage.getState().setCurrentPage(1);
          return {
            components: filteredComponents,
          };
        }),
    }),
    { name: "ComponentStore" },
  ),
);

export interface CurrentPageState {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const useCurrentPage = create<CurrentPageState>()(
  devtools(
    (set) => ({
      currentPage: 1,
      setCurrentPage: (page) => set((state) => ({ currentPage: page })),
    }),
    { name: "CurrentPageStore" },
  ),
);

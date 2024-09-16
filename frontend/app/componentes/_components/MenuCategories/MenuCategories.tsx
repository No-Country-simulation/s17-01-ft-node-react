"use client";
import { LayoutGridIcon } from "lucide-react";
import styles from "./styles.module.css";
import { Categories } from "@/lib/types/api/categories.type";
import {
  useCurrentPage,
  useFilterComponentStore,
} from "@/store/componentStore";

interface Category {
  categories: Categories[];
}

export const MenuCategories = ({ categories }: Category) => {
  const { filters, setCategory } = useFilterComponentStore();
  const { setCurrentPage } = useCurrentPage();
  return (
    <div className={styles["menu"]}>
      <h1 className={styles["menu__title"]}>Componentes</h1>
      <div
        className={`${styles["menu__item--default"]} ${
          filters.category === undefined ? styles["menu__item--active"] : ""
        }`}
        onClick={() => setCategory(undefined)}
      >
        <LayoutGridIcon />
        <span>Todo los componentes</span>
      </div>
      <ul className={styles["menu__ul"]}>
        {categories &&
          categories.map((category) => (
            <li
              key={category.id}
              className={`${styles["menu__item"]} ${
                filters.category?.id === category.id
                  ? styles["menu__item--active"]
                  : ""
              }`}
              onClick={() => {
                setCategory(category), setCurrentPage(1);
              }}
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

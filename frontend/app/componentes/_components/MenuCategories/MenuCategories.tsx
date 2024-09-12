"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { ChevronDownIcon, LayoutGridIcon } from "lucide-react";

const categories: {
  id: number;
  name: string;
  subcategories: { name: string }[];
}[] = [
  {
    id: 1,
    name: "Input",
    subcategories: [{ name: "Text Input" }, { name: "Password Input" }],
  },
  {
    id: 2,
    name: "Layout",
    subcategories: [{ name: "Grid" }, { name: "Flexbox" }],
  },
  {
    id: 3,
    name: "Modal",
    subcategories: [{ name: "Basic Modal" }, { name: "Confirmation Modal" }],
  },
  {
    id: 4,
    name: "Dropdown",
    subcategories: [
      { name: "Basic Dropdown" },
      { name: "Dropdown with Submenus" },
    ],
  },
];

export const MenuCategories = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (categoryId: number) => {
    setOpenDropdown((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className={styles["menu"]}>
      <h1 className={styles["menu__title"]}>Componentes</h1>
      <div className={styles["menu__item--default"]}>
        <LayoutGridIcon />
        <span>Todo los componentes</span>
      </div>
      {categories.map((category) => (
        <div key={category.id} className={styles["menu__item"]}>
          <button
            onClick={() => toggleDropdown(category.id)}
            className={styles["menu__button"]}
            aria-expanded={openDropdown === category.id}
          >
            <ChevronDownIcon className={styles["menu__icon"]} />
            {category.name}
          </button>
          {openDropdown === category.id && (
            <ul className={styles["menu__submenu"]}>
              {category.subcategories.map((sub) => (
                <li key={sub.name} className={styles["menu__submenu-item"]}>
                  {sub.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

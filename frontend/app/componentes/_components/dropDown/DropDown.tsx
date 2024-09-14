"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

interface Subcategory {
  name: string;
  link: string;
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

const categories: Category[] = [
  {
    name: "Input",
    subcategories: [
      { name: "Text Input", link: "/components/input/text" },
      { name: "Password Input", link: "/components/input/password" },
    ],
  },
  {
    name: "Layout",
    subcategories: [
      { name: "Grid", link: "/components/layout/grid" },
      { name: "Flexbox", link: "/components/layout/flexbox" },
    ],
  },
  {
    name: "Modal",
    subcategories: [
      { name: "Basic Modal", link: "/components/modal/basic" },
      { name: "Confirmation Modal", link: "/components/modal/confirmation" },
    ],
  },
];

export const Dropdown: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <ul>
      {categories.map((category) => (
        <li
          key={category.name}
          className={
            openCategory === category.name
              ? `${styles["dropdown--open"]}`
              : `${styles["dropdown--closed"]}`
          }
        >
          <button
            onClick={() => toggleCategory(category.name)}
            className={styles["dropdown__button"]}
          >
            {category.name}
          </button>
          {openCategory === category.name && (
            <ul className={styles["dropdown__submenu"]}>
              {category.subcategories.map((sub) => (
                <li key={sub.name} className={styles["dropdown__submenu-item"]}>
                  <Link href={sub.link} className={styles["dropdown__link"]}>
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

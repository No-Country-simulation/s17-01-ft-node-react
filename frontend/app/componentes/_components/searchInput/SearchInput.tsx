/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { GlassesIcon } from "lucide-react";
import styles from "./styles.module.css";
import {
  useComponentStore,
  useFilterComponentStore,
} from "@/store/componentStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect } from "react";

export function SearchInput() {
  const { filters, setSearchName } = useFilterComponentStore();
  const { filterComponents, components, allComponents } = useComponentStore();
  const value = useDebounce(filters.name || "", 500);

  useEffect(() => {
    filterComponents(value);
  }, [value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };
  console.log({ components, allComponents });
  return (
    <div className={styles["block"]}>
      <input
        className={styles["block__input"]}
        type="text"
        placeholder="Buscar..."
        value={filters.name || ""}
        onChange={onChange}
      />
      <GlassesIcon className={styles["block__icon"]} />
    </div>
  );
}

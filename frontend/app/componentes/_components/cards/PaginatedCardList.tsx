"use client";
import {
  useComponentStore,
  useCurrentPage,
  useFilterComponentStore,
} from "@/store/componentStore";
import styles from "./styles.module.css";
import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { fetchComponents } from "@/lib/axios/api/components";

import Card from "@/app/componentes/_components/card/Card";
import Pagination from "../pagination/Pagination";
import { Loading } from "@/components";

export default function PaginatedCardList() {
  const { components, setComponents, setAllComponents } = useComponentStore();
  const { filters } = useFilterComponentStore();
  const { currentPage, setCurrentPage } = useCurrentPage();

  const { isLoading, error } = useFetch({
    fetchFn: () => fetchComponents(undefined, undefined, filters),
    dependencies: [filters.category?.id],
    onSuccess: (data) => {
      setCurrentPage(1);
      setComponents(data);
      setAllComponents(data);
    },
    useLocalState: false,
    loadingDelay: 1000,
  });

  const itemsPerPage = 9;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return components.slice(startIndex, endIndex);
  };

  if (isLoading)
    return (
      <div className={styles["section__cards--loading"]}>
        <Loading />
      </div>
    );
  if (error) return <div>Error</div>;

  const paginatedItems = getPaginatedItems();

  return (
    <section className={styles["section__cards"]}>
      <h2 className={styles["section__subtitle"]}>
        {filters.category?.name || "Todos los componentes"}
      </h2>

      <Pagination
        totalItems={components.length}
        itemsPerPage={itemsPerPage}
        maxPageButtons={5}
        currentPage={currentPage}
        btnInitialPage
        btnLastPage
        handlePageChange={handlePageChange}
      />

      <div className={styles["section__container"]}>
        {paginatedItems.map((component) => (
          <Card key={component.id} component={component}  />
        ))}
      </div>

      <div className={styles["section__container-pagination"]}>
        <Pagination
          totalItems={components.length}
          itemsPerPage={itemsPerPage}
          maxPageButtons={5}
          currentPage={currentPage}
          btnInitialPage
          btnLastPage
          handlePageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

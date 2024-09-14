import { useCallback } from "react";

/**
 * Custom hook para la lógica de paginación.
 *
 * @param totalItems - El número total de ítems a paginar.
 * @param itemsPerPage - La cantidad de ítems que se muestran en cada página.
 * @param maxPageButtons - El número máximo de botones de página a mostrar.
 * @param btnInitialPage - Indica si se debe mostrar el botón para la primera página.
 * @param btnLastPage - Indica si se debe mostrar el botón para la última página.
 * @param currentPage - El número actual de la página.
 *
 * @returns {[number, (number | string)[], number]} - El número de la página actual, un array de números de página y/o `...`, y el número total de páginas.
 */
export function usePagination(
  totalItems: number,
  itemsPerPage: number,
  maxPageButtons = 5,
  btnInitialPage = true,
  btnLastPage = true,
  currentPage: number,
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const createPageRange = useCallback((): (number | string)[] => {
    const pages: Array<number | string> = [];
    let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    if (totalPages <= maxPageButtons) {
      // Mostrar todas las páginas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar un rango de botones con `...`
      if (btnInitialPage && startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (btnLastPage && endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages, maxPageButtons, btnInitialPage, btnLastPage]);

  // Retorna los valores correctos: currentPage, el array de páginas, y el total de páginas.
  return [createPageRange(), totalPages] as const;
}

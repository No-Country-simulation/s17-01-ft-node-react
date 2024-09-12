'use client';
import { useState } from "react";
import styles from "./styles.module.css";

/**
 * Props para el componente de paginación.
 * @interface PaginationProps
 * @property {number} totalItems - El número total de ítems a paginar.
 * @property {number} itemsPerPage - La cantidad de ítems que se muestran en cada página.
 * @property {number} [maxPageButtons] - El número máximo de botones de página a mostrar. Opcional.
 * @property {boolean} [btnInitialPage] - Indica si se debe mostrar el botón para la primera página. Opcional.
 * @property {boolean} [btnLastPage] - Indica si se debe mostrar el botón para la última página. Opcional.
 * @property {(page: number) => void} onPageChange - Función que se llama cuando el usuario cambia de página. Recibe el número de la página seleccionada como argumento.
 */
interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    maxPageButtons?: number;
    btnInitialPage?: boolean;
    btnLastPage?: boolean;
    onPageChange: (page: number) => void;
}

/**
 * Componente de paginación.
 * 
 * Muestra una interfaz para navegar entre páginas de ítems. Incluye botones para la primera y última página, así como botones de navegación para la página anterior y la siguiente. Los botones de página están limitados por el número máximo de botones especificado, y se muestra `...` si hay más páginas disponibles.
 * 
 * @param {PaginationProps} props - Las propiedades para configurar el componente de paginación.
 * @param {number} props.totalItems - El número total de ítems a paginar.
 * @param {number} props.itemsPerPage - La cantidad de ítems que se muestran en cada página.
 * @param {number} [props.maxPageButtons] - El número máximo de botones de página a mostrar. Opcional.
 * @param {boolean} [props.btnInitialPage] - Indica si se debe mostrar el botón para la primera página. Opcional.
 * @param {boolean} [props.btnLastPage] - Indica si se debe mostrar el botón para la última página. Opcional.
 * @param {(page: number) => void} props.onPageChange - Función que se llama cuando el usuario cambia de página. Recibe el número de la página seleccionada como argumento.
 * 
 * @returns {JSX.Element} - El componente de paginación renderizado.
 */
export function Pagination({
    totalItems,
    itemsPerPage,
    maxPageButtons = 5,
    btnInitialPage = true,
    btnLastPage = true,
    onPageChange
}: PaginationProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            onPageChange(page);
        }
    };

    /**
     * Crea un rango de números de página a mostrar, incluyendo `...` si es necesario.
     * 
     * @returns {(number | string)[]} - Un array de números de página y/o `...` para indicar páginas adicionales.
     */
    const createPageRange = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
        let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

        if (totalPages <= maxPageButtons) {
            // Si hay menos páginas que el máximo de botones, mostrar todas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Mostrar un rango de botones con `...` si hay muchas páginas
            if (btnInitialPage && startPage > 1) {
                pages.push(1); // Siempre mostrar la primera página
                if (startPage > 2) pages.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (btnLastPage && endPage < totalPages) {
                if (endPage < totalPages - 1) pages.push('...');
                pages.push(totalPages); // Siempre mostrar la última página
            }
        }
        return pages;
    };

    const pages = createPageRange();

    return (
        <div className={styles["pagination-wrapper"]}>
            {/* Botón de la primera página */}
            {btnInitialPage && totalPages > 1 && (
                <button onClick={() => handlePageChange(1)} className={styles["pagination-button"]}>
                    &laquo; {/* Representa el botón de la primera página */}
                </button>
            )}
            {/* Botón de la página anterior */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`${styles["pagination-button"]} ${currentPage === 1 ? styles["disabled"] : ''}`}
                disabled={currentPage === 1}
            >
                &lsaquo; {/* Representa el botón de la página anterior */}
            </button>
            {/* Botones de páginas numeradas */}
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={`${styles["pagination-button"]} ${currentPage === page ? styles["active"] : ''}`}
                >
                    {page}
                </button>
            ))}
            {/* Botón de la página siguiente */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${styles["pagination-button"]} ${currentPage === totalPages ? styles["disabled"] : ''}`}
                disabled={currentPage === totalPages}
            >
                &rsaquo; {/* Representa el botón de la página siguiente */}
            </button>
            {/* Botón de la última página */}
            {btnLastPage && totalPages > 1 && (
                <button onClick={() => handlePageChange(totalPages)} className={styles["pagination-button"]}>
                    &raquo; {/* Representa el botón de la última página */}
                </button>
            )}
        </div>
    );
}

import { usePagination } from "@/hooks/usePagination";
import styles from "./styles.module.css";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  maxPageButtons?: number;
  btnInitialPage?: boolean;
  btnLastPage?: boolean;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  maxPageButtons = 5,
  currentPage,
  btnInitialPage = true,
  btnLastPage = true,
  handlePageChange,
}: PaginationProps) {
  const [pages, totalPages] = usePagination(
    totalItems,
    itemsPerPage,
    maxPageButtons,
    btnInitialPage,
    btnLastPage,
    currentPage,
  );

  return (
    <div className={styles["pagination-wrapper"]}>
      {btnInitialPage && totalItems > itemsPerPage && (
        <button
          onClick={() => handlePageChange(1)}
          className={styles["pagination-button"]}
        >
          &laquo;
        </button>
      )}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`${styles["pagination-button"]} ${
          currentPage === 1 ? styles["disabled"] : ""
        }`}
        disabled={currentPage === 1}
      >
        &lsaquo;
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          className={`${styles["pagination-button"]} ${
            currentPage === page ? styles["active"] : ""
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`${styles["pagination-button"]} ${
          currentPage === totalPages ? styles["disabled"] : ""
        }`}
        disabled={currentPage === totalPages}
      >
        &rsaquo;
      </button>
      {btnLastPage && totalItems > itemsPerPage && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className={styles["pagination-button"]}
        >
          &raquo;
        </button>
      )}
    </div>
  );
}

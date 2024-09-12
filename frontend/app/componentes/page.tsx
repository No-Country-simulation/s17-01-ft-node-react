'use client';
import { Card } from "./_components/card/Card";
import { SearchInput } from "./_components/searchInput/SearchInput";
import styles from "./styles.module.css";
import { MenuCategories } from "./_components/MenuCategories/MenuCategories";
import { Pagination } from "./_components/pagination/Pagination";
export default function page() {
  return (
    <section className={styles["section"]}>
     
      <aside className={styles["section__aside"]}>
        <MenuCategories />
      </aside>
      {/* Muestra  Componentes */}
      <div className={styles["section__content"]}>
        <div className={styles["section__div"]}>
          <h1 className={styles["section__title"]}>
            Diseño de Componentes React
          </h1>
          <SearchInput />
        </div>
        <section className={styles["section__cards"]}>
          <h2 className={styles["section__subtitle"]}>Plantillas Premiun</h2>
          <div className={styles["section__container"]}>
            {Array.from({ length: 12 }).map((_, index) => (
              <Card key={index} />
            ))}
          </div>
          <div className={styles["section__container-pagination"]}>
          <Pagination itemsPerPage={10} maxPageButtons={6} onPageChange={() => {1}} totalItems={100} />
          </div>
        </section>
      </div>
    </section>
  );
}

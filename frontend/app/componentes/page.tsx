import { getCategories } from "@/lib/axios/api/categories";
import { MenuCategories } from "./_components/MenuCategories/MenuCategories";
import { SearchInput } from "./_components/searchInput/SearchInput";
import styles from "./styles.module.css";
import PaginatedCardList from "./_components/cards/PaginatedCardList";

export default async function Page() {
  const categories = await getCategories();

  return (
    <section className={styles["section"]}>
      <aside className={styles["section__aside"]}>
        <MenuCategories categories={categories} />
      </aside>
      <div className={styles["section__content"]}>
        <div className={styles["section__div"]}>
          <h1 className={styles["section__title"]}>
            Diseño de Componentes React
          </h1>
          <SearchInput />
        </div>
        <PaginatedCardList />
      </div>
    </section>
  );
}

import { LayoutGridIcon } from "lucide-react";
import { Card } from "./_components/card/Card";
import { SearchInput } from "./_components/searchInput/SearchInput";
import styles from "./styles.module.css";
export default function page() {
  return (
    <section className={styles["section"]}>
      {/*  */}
      <div>
        <h2 >Componentes</h2>
        <button> <LayoutGridIcon  /> Todo los componentes</button>
      <select name="" id="">
        <option value="">Input</option>
        <option value="">Select</option>
        <option value="">Textarea</option>
        <option value="">Button</option>
      </select>
      </div>
      {/* Muestra  Componentes */}
      <div>
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
        </section>
      </div>
    </section>
  );
}

import { GlassesIcon } from "lucide-react";
import styles from "./styles.module.css";
export function SearchInput() {
  return (
    <div className={styles["block"]}>
      <input className={styles["block__input"]} type="text" placeholder="Buscar..." />
      <GlassesIcon className={styles["block__icon"]}/>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
import { StarIcon, UsersIcon } from "lucide-react";
import styles from "./styles.module.css";

export function Card() {
  return (
    <div className={styles["card"]}>
      <img
        className={styles["card__image"]}
        src="https://picsum.photos/id/237/200/300"
        alt="Imagen de prueba"
      />
      <div className={styles["card__content"]}>
        <h3 className={styles["card__title"]}>Título de la tarjeta</h3>
        <p className={styles["card__description"]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod, nisl sit amet ultricies lacinia, nunc nisl aliquam nisl, eu
        </p>
        <div className={styles["card__stats"]}>
          <div className={styles["card__stat"]}>
            <UsersIcon className={styles["card__icon"]} />
            <span className={styles["card__stat-text"]}>1.405</span>
          </div>
          <div className={styles["card__stat"]}>
            <StarIcon className={styles["card__icon"]} />
            <span className={styles["card__stat-text"]}>4.8(783)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

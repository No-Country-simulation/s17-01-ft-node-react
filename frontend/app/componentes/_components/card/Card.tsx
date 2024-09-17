/* eslint-disable @next/next/no-img-element */
import { StarIcon, UsersIcon } from "lucide-react";
import styles from "./styles.module.css";
import { Component } from "@/lib/types/api/components.type";
import Link from "next/link";
export interface CardProps {
  component: Component;
}
export default function Card({ component }: CardProps) {
  return (
    <div className={styles["card"]} onClick={() => window.location.href = `/componentes/${component.id}`}>
      <img
        className={styles["card__image"]}
        src={component.image}
        alt="Imagen de prueba"
      />
      <div className={styles["card__content"]}>
        <h3 className={styles["card__title"]}>{component.name}</h3>
        <p className={styles["card__description"]}>{component.description}</p>
        <div className={styles["card__stats"]}>
          <div className={styles["card__stat"]}>
            <UsersIcon className={styles["card__icon"]} />
            <span className={styles["card__stat-text"]}>
              {component.downloads}
            </span>
          </div>
          <div className={styles["card__stat"]}>
            <StarIcon className={styles["card__icon"]} />
            <span className={styles["card__stat-text"]}>
              {component.rating}({component.downloads})
            </span>
            <Link href={`/componentes/${component.id}`}>Ver</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

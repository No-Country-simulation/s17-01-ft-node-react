"use client";
import styles from "./styles.module.css";
import { PricingCardProps } from "@/lib/types";
import { Button } from "@/ui-atoms";
import { Check } from "lucide-react";

export function PricingCard(props: PricingCardProps) {
  return (
    <div
      className={`${styles.container} ${props.recommended && styles.recommended}`}
    >
      {props.recommended && <p className={styles.recommended_p}>Recomendado</p>}
      <div className={styles.title_container}>
        <h3 className={styles.title}>{props.title}</h3>
        <p className={styles.desc}>{props.description}</p>
      </div>
      <div className={styles.price_container}>
        <h3 className={styles.price}>{props.price}</h3>
        <p className={styles.limit}>{props.limit}</p>
      </div>
      <ul className={styles.benefit_list}>
        {props.benefits.map((b, index) => {
          return (
            <li key={b} className={styles.benefit_item}>
              <Check color="var(--color-primary)" size={20} />
              <p>{b}</p>
            </li>
          );
        })}
      </ul>
      <Button onClick={props.onClick} variant={props.button.variant}>
        {props.button.text}
      </Button>
    </div>
  );
}

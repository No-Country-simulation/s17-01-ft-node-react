/* eslint-disable @next/next/no-img-element */
"use client"
import { Component } from "@/lib/types/api/components.type";
import styles from "./styles.module.css";
// import AsideComponent from "../AsideComponent";
import { Button } from "@/ui-atoms";
import { Check, ShoppingCart } from "lucide-react";

export interface CardPropDetail {
  component: Component
}

// recibir prop
export default function ComponentDetail({ component }: CardPropDetail) {

  const handleButton = () => {

  }

  return (
    <div className={styles.container}>
      <section className={styles.section_container}>
        <h1 className={styles.title}>{component.name}</h1>

        <div className={styles.video_container}>
          <p className={styles.text}>Los campos de texto permiten a los usuarios ingresar y editar texto.</p>
          <video className={styles.video} controls>
            <source src={component.video}></source>
          </video>
        </div>
        <div className={styles.image_container}>
          <p className={styles.text}>{component.description}</p>
          <p className={styles.text}>Ejemplos</p>
          <img src={component.image} alt="" className={styles.image} />
        </div>
        <div className={styles.readme_container}>
          <h2>Proceso de instalación</h2>
          <p className={styles.text}>{component.readme}</p>
          <div className={styles.button}>
            <Button type="button" variant="text" onClick={handleButton}>Ver más</Button>
          </div>
        </div>
      </section>

      <aside className={styles.aside_container}>
        <div className={styles.price_codeplus}>
          <h2 className={styles.price_title}>Precio <span className={styles.price_titleSpan}>CodePlus</span></h2>
          <Button type="button" variant="main" onClick={handleButton}>Suscribirse</Button>
          <ul className={styles.ul_container}>
            <li className={styles.li_container}>
              <Check className={styles.check} />
              <span className={styles.span_text}>Accede a +1.000 componentes de manera ilimitada</span>
            </li>
            <li className={styles.li_container}>
              <Check className={styles.check} />
              <span className={styles.span_text}>Después de los 30 días de prueba, $1.5/mes (un pago de $10). Cancela cuando quieras</span>
            </li>
          </ul>
        </div>
        <div className={styles.price_regularContainer}>
          <h2 className={styles.price_title}>Precio Regular</h2>
          <p className={styles.price_regular}>${component.price}</p>
          <span>Pagar precio completo</span>
          <Button type="button" variant="main" disabled={true} onClick={handleButton}>Comprar</Button>
        </div>

        <Button type="button" variant="main" onClick={handleButton}>Descargar</Button>

        <div>


        </div>
      </aside>
    </div>
  )
}

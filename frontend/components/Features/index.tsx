"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export function Features(): JSX.Element {
  const [visibleParagraph, setVisibleParagraph] = useState<number | null>(null);

  const handleButtonClick = (index: number): void => {
    setVisibleParagraph(index === visibleParagraph ? null : index);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¿Por qué comprar en CodePieces?</h1>
      <p className={styles.paragraph}>
        La plataforma que conecta a desarrolladores y creadores de componentes
        en un solo lugar.
      </p>
      <div className={styles.featuresContent}>
        <div className={styles.image}>
          <Image
            src="/Component.png"
            height={417}
            width={569}
            quality={100}
            alt="component"
          />
        </div>

        <div className={styles.buttonsWrapper}>
          <div className={styles.buttons}>
            {[1, 2, 3].map((index: number) => (
              <button
                key={index}
                onClick={() => handleButtonClick(index)}
                className={visibleParagraph === index ? styles.active : ""}
              >
                {index}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.textContent}>
          <h2 className={styles.h2}>Componentes premium</h2>
          {visibleParagraph === 1 && (
            <p className={styles.p}>
              Accede a una biblioteca curada de componentes React de alta
              calidad, diseñados para potenciar la eficiencia de tus proyectos.
            </p>
          )}

          <h2 className={styles.h2}>Marketplace Profesional</h2>
          {visibleParagraph === 2 && (
            <p className={styles.p}>
              Compra y vende componentes con total confianza en nuestro
              marketplace especializado, diseñado para satisfacer las demandas
              del desarrollo moderno.
            </p>
          )}

          <h2 className={styles.h2}>Comunidad Exclusiva</h2>
          {visibleParagraph === 3 && (
            <p className={styles.p}>
              Únete a una comunidad de desarrolladores apasionados, donde la
              colaboración y la innovación son la clave del éxito.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import styles from "./styles.module.css";

export function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.boxGroup}>
        <div className={styles.box1}>
          <Image
            src="/about1.png"
            height={432}
            width={559}
            alt="about1"
            quality={100}
          />
        </div>
        <div className={styles.box2}>
          <h1>Misión</h1>
          <p>
            Facilitar a los desarrolladores la monetización de sus creaciones y
            proporcionar a los compradores acceso a componentes de alta calidad
            que mejoren sus proyectos, todo a través de una experiencia de
            usuario eficiente y segura.
          </p>
        </div>
      </div>
      <div className={styles.boxGroup}>
        <div className={styles.box3}>
          <h1>Visión</h1>
          <p>
            Convertirnos en la principal plataforma de intercambio de
            componentes de software, promoviendo la colaboración y la innovación
            en el desarrollo tecnológico a ni
          </p>
        </div>
        <div className={styles.box4}>
          <Image
            src="/about2.png"
            height={432}
            width={559}
            alt="about2"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}

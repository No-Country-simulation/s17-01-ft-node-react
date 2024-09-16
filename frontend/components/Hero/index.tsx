import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";

export function Hero() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.paragraphContainer}>
          <p className={styles.paragraph}>
            Unete a nuestra comunidad y lleva tus proyectos al siguiente nivel
          </p>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            <span className={styles.partOne}>Explora</span>
            <span className={styles.partTwo}> Componentes de React</span>
          </h1>
        </div>
        <p>Construye más rápido, con los mejores componentes</p>
        <div className={styles.buttonContainer}>
          <Link href="/Auth/login" className={styles.button}>
            Comienza ahora
          </Link>
        </div>

        <Image
          className={styles.image}
          quality={100}
          src="/Header.png"
          width={1280}
          height={459}
          alt="Header"
        />
      </div>
    </>
  );
}

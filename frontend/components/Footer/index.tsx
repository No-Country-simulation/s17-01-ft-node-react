/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Inputs } from "@/ui-atoms";
import styles from "./styles.module.css";
import Link from "next/link";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles["footer__content"]}>
        <article className={styles["footer__article"]}>
          <div className={styles["footer__block"]}>
            <h2 className={styles["footer__heading"]}>Equipo</h2>
            <Link href="/team" className={styles["footer__link"]}>Nosotros</Link>
            <Link href="/team" className={styles["footer__link"]}>Codeplus</Link>
            <Link href="/terms" className={styles["footer__link"]}>Términos y Condiciones</Link>
          </div>

          <div className={styles["footer__block"]}>
            <h2 className={styles["footer__heading"]}>Comunidad</h2>
            <Link href="/blogs" className={styles["footer__link"]}>Blogs</Link>
            <Link href="/faq" className={styles["footer__link"]}>Preguntas Frecuentes</Link>
          </div>

          <div className={styles["footer__block"]}>
            <h2 className={styles["footer__heading"]}>Contenidos</h2>
            <Link href="/components" className={styles["footer__link"]}>Componentes</Link>
            <Link href="/free-react" className={styles["footer__link"]}>Free React</Link>
          </div>
        </article>
        <aside className={styles["footer__contact"]}>
          <h2 className={styles["footer__heading"]}>¡Contáctanos ahora!</h2>
          <form className={styles["footer__form"]}>
            <input className={styles["footer__input"]} placeholder="Ingresa tu e-mail"/>
            <button className={styles["footer__button"]}>Enviar</button>
          </form>
        </aside>
      </section>
      <section className={styles["footer__bottom"]}>
        <p className={styles["footer__copyright"]}>
          © 2022 CodePieces. All rights reserved.
        </p>
        <nav className={styles["footer__socials"]} aria-label="Redes Sociales">
          <img
            src="/linkedinIcon.png"
            alt="LinkedIn"
            className={styles["footer__social-icon"]}
          />
          <img
            src="/githubIcon.png"
            alt="GitHub"
            className={styles["footer__social-icon"]}
          />
        </nav>
      </section>
    </footer>
  );
}

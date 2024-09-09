/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Inputs } from "@/ui-atoms";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__content"]}>
        <div className={styles["footer__team"]}>
          <h2 className={styles["footer__heading"]}>Equipo</h2>
        </div>
        <div className={styles["footer__contact"]}>
          <h2 className={styles["footer__heading"]}>¡Contáctanos ahora!</h2>
          <div className={styles["footer__contact-form"]}>
            <Inputs type="email" name="email" onChange={() => {}} />
            <Button variant="main" onClick={() => {}}>
              Enviar
            </Button>
          </div>
        </div>
      </div>
      <div className={styles["footer__bottom"]}>
        <p className={styles["footer__copyright"]}>© 2022 CodePieces. All rights reserved.</p>
        <div className={styles["footer__socials"]}>
          <img src="/linkedinIcon.png" alt="linkedin" className={styles["footer__social-icon"]} />
          <img src="/githubIcon.png" alt="github" className={styles["footer__social-icon"]} />
        </div>
      </div>
    </footer>
  );
}

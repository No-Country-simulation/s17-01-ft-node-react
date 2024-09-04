/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { CircleHelpIcon } from "lucide-react";
import { useUnderlineEffect } from "@/hooks";


export function Navbar() {
  const { menuRef, underlineRef } = useUnderlineEffect();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/CodePiecesLogo.png" alt="Logo" />
      </div>
      <div className={styles.menu} ref={menuRef}>
        <Link href="/" className={styles.navLink}>
          Inicio
        </Link>
        <Link href="/componentes" className={styles.navLink}>
          Componentes
        </Link>
        <Link href="/nosotros" className={styles.navLink}>
          Nosotros
        </Link>
        <Link href="/contacto" className={styles.navLink}>
          Contacto
        </Link>
        <Link
          href="/code-plus"
          className={`${styles.navLink} ${styles.codePlus}`}
        >
          CodePlus
        </Link>
        <span className={styles.underline} ref={underlineRef}></span>
      </div>
      <div className={styles.actions}>
        <Link href="/login" className={styles.loginButton}>
          Ingresar
        </Link>
        <CircleHelpIcon color="#FFFFFF" width={24} height={24} />
      </div>
    </nav>
  );
}




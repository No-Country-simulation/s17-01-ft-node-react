/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { ChevronDownIcon, CircleHelpIcon } from "lucide-react";
import { useUnderlineEffect } from "@/hooks";


export function Navbar() {
  const { menuRef, underlineRef } = useUnderlineEffect();
  const userProfilePicture = "https://randomuser.me/api/portraits/men/1.jpg";
  const isAuthenticated = true;
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
      {isAuthenticated ? (
          // Si el usuario está autenticado, muestra la imagen de perfil y el dropdown
          <div className={styles.profile}>
            <img
              src={userProfilePicture}
              alt="Foto de perfil"
              className={styles.profilePic}
            />
            <ChevronDownIcon
              color="#FFFFFF"
              width={24}
              height={24}
              className={styles.dropdownIcon}
            />
            <div className={styles.dropdownMenu}>
              <Link href="/perfil">Mi Perfil</Link>
              <Link href="/ajustes">Ajustes</Link>
              <Link href="/logout">Cerrar Sesión</Link>
            </div>
          </div>
        ) : (
          // Si el usuario no está autenticado, muestra los botones de login
          <>
            <Link href="/login" className={styles.loginButton}>
              Ingresar
            </Link>
            <CircleHelpIcon color="#FFFFFF" width={24} height={24} />
          </>
        )}
      </div>
    </nav>
  );
}




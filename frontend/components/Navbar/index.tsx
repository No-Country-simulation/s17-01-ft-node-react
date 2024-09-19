/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { ChevronDownIcon, CircleHelpIcon } from "lucide-react";
import { useUnderlineEffect } from "@/hooks";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const { menuRef, underlineRef } = useUnderlineEffect();
  const { user, setUser, isAuthenticated } = useUserStore();
  const userProfilePicture = user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg";
  
  const [navText, setNavText] = useState("Inicio");

  useEffect(() => {
    setNavText(isAuthenticated ? "Mi gestión" : "Inicio");
  }, [isAuthenticated]);

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/CodePiecesLogo.png" alt="Logo" />
      </div>
      <div className={styles.menu} ref={menuRef}>
        <Link href={isAuthenticated ? "/my-management" : "/"} className={styles.navLink}>
          {navText}
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
        <Link href="/code-plus" className={`${styles.navLink} ${styles.codePlus}`}>
          CodePlus
        </Link>
        <span className={styles.underline} ref={underlineRef}></span>
      </div>
      <div className={styles.actions}>
        {isAuthenticated === null ? (
          // Mostrar un loader o un placeholder mientras se carga la información de autenticación
          <div className={styles.loadingPlaceholder}>Cargando...</div>
        ) : isAuthenticated ? (
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
              <button onClick={handleLogout} className={styles.logoutButton}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link href="Auth/login" className={styles.loginButton}>
              Ingresar
            </Link>
            <CircleHelpIcon color="#FFFFFF" width={24} height={24} />
          </>
        )}
      </div>
    </nav>
  );
}

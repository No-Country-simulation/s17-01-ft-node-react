/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { ChevronDownIcon, CircleHelpIcon } from "lucide-react";
import { useUnderlineEffect } from "@/hooks";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
export function Navbar() {
  const router = useRouter();
  const { menuRef, underlineRef } = useUnderlineEffect();
  const {user, setUser} = useUserStore();
  const userProfilePicture = user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg";
 const isAuthenticated = window.localStorage.getItem("token") || null;
 const handleLogout = () => {
   window.localStorage.removeItem("token");
   window.localStorage.removeItem("user");
   setUser(null);
  router.push("/");
 }
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/CodePiecesLogo.png" alt="Logo" />
      </div>
      <div className={styles.menu} ref={menuRef}>
        <Link href={ isAuthenticated ? "/my-management" : "/"} className={styles.navLink}>
          {isAuthenticated ? "Mi gestión" : "Inicio"}
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
              <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>
            </div>
          </div>
        ) : (
          // Si el usuario no está autenticado, muestra los botones de login
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

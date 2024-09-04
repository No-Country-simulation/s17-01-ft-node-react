/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.css";
import { CircleHelpIcon } from "lucide-react";
import LogoCodePiece from "@/public/CodePiecesLogo.png";
export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img src={LogoCodePiece.src} alt="logo CodePieces" />
      <ul className={styles.navbar_links}>
        <Link href={"/"} className={styles.navbar_links_link}>Inicio</Link>
        <Link href={"/"} className={styles.navbar_links_link}>Componentes</Link>
        <Link href={"/"} className={styles.navbar_links_link}>Nosotros</Link>
        <Link href={"/"} className={styles.navbar_links_link}>Contacto</Link>
        <Link href={"/"} className={styles.navbar_links_link_active}>CodePlus</Link>
      </ul>
      <div>
        <Link href={"/auth/login"} className={styles.navbar_link_button}>Login</Link>
        <CircleHelpIcon />
      </div>
    </nav>
  );
}

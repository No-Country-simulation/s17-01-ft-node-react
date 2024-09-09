"use client";
import MainLogo from "@/assets/logos/MainLogo";
import styles from "./styles.module.css";
import { Button, Inputs } from "@/ui-atoms";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import imageLogin from "@/public/background_image.png"

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false);


  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, complete todo los campos.");
      return;
    }

    setError(null);
    console.log("Iniciar sesión con: ", { email, password });

  }

  return (
    <div className={styles.login_page}>
      <div className={styles.image_container}>
        <Image src={imageLogin} className={styles.image} alt="" style={{width: "100%", height: "100%"}} ></Image>
      </div>

      <div className={styles.login_container}>
        <div className={styles.header_container}>
          <MainLogo />
          <h1 className={styles.title}>!Hola de nuevo!</h1>
          <p className={styles.subtitle}>Nos alegra volver a verte</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin} >
          <Inputs
            label="Correo electronico"
            name="email"
            type="email"
            value={email}
            placeholder="Ej. ejemplo@gmail.com"
            required={true}
            disabled={disabled}
            onChange={(value) => setEmail(value)}
          />
          <p className={styles.link}><Link className={styles.linkPassword} href={"/"}>¿Olvidaste tu contraseña? </Link></p>
          <Inputs
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Ingrese su contraseña"
            onChange={(value) => setPassword(value)}
          />
          <Button
            variant="main"
            type="submit"
            disabled={disabled}
            onClick={() => console.log("login...")}
          >
            Iniciar sesión
          </Button>

          <p className={styles.link_signup}>¿No tienes cuenta? <Link className={styles.linkSignup} href={"/signup"}>Registrate</Link></p>
        </form>
      </div>
    </div >
  );
}

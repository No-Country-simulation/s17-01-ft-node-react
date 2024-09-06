"use client";
import styles from "./styles.module.css";
import { Button, Inputs } from "@/ui-atoms";

export function Login() {

  const handleLogin = (e) => {
    e.preventDefault();
  }


  return (
    <div className={styles.login_page}>
      <div>
        <img src="/background_image.png" alt=""/>
      </div>

      <div className={styles.login_container}>
        <h1 className={styles.h1}>!Hola de nuevo!</h1>
        <p className={styles.p}>Nos alegra volver a verte</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <Inputs
            label="Correo electronico"
            name="email"
            type="email"
            placeholder="Ej. ejemplo@gmail.com"
            onChange={() => console.log("hola")}
          />
          <Inputs
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Ingrese su contraseña"
            onChange={() => console.log("")}
          />
          <Button
            variant="main"
            type="submit"
            onClick={() => console.log("login...")}
          >
            Iniciar sesión
          </Button>

          <span>¿no tienes cuenta? Registrate</span>
        </form>
      </div>
    </div >
  );
}

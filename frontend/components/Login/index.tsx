"use client";
import MainLogo from "@/assets/logos/MainLogo";
import styles from "./styles.module.css";
import { Button, Inputs } from "@/ui-atoms";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import imageLogin from "@/public/background_image.png";
import { useForm } from "@/hooks/useForm";
import { login } from "@/lib/axios/api/auth";

export function Login() {
  const { form, setForm, missing, setMissing, error, setError } = useForm();
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailTrimmed = form.email.trim();
    const passwordTrimmed = form.password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      setError({ ...error, email: "Por favor, complete todos los campos." });
      return;
    }
    if (error.password || error.email) return;

    console.log(form);
    
    try {
      setDisabled(true);
      // const response = await fetch("/api/login", { ... });
      const response = await login(form);
      console.log("respuesta de login",response);
      localStorage.setItem("token", response.payload.token)
      setDisabled(false);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setDisabled(false);
    }
  };

  const handleInvalid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    if (input.name === "email") {
      setError({ ...error, email: "Formato de correo inválido." });
    }
    setMissing({ ...missing, [input.name]: true });
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.image_container}>
        <Image
          src={imageLogin}
          className={styles.image}
          alt=""
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </div>

      <div className={styles.login_container}>
        <div className={styles.header_container}>
          <MainLogo />
          <h1 className={styles.title}>!Hola de nuevo!</h1>
          <p className={styles.subtitle}>Nos alegra volver a verte</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin} onInvalid={handleInvalid}>
          <Inputs
            label="Correo electronico"
            name="email"
            type="email"
            value={form.email}
            placeholder="Ej. ejemplo@gmail.com"
            required={true}
            disabled={disabled}
            errorMessage={error.email}
            onChange={(value: string) => handleChange("email", value)}
          />
          <p className={styles.link}>
            <Link className={styles.linkPassword} href={"/"}>
              ¿Olvidaste tu contraseña?{" "}
            </Link>
          </p>
          <Inputs
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            placeholder="Ingrese su contraseña"
            required={true}
            disabled={disabled}
            errorMessage={error.password}
            onChange={(value: string) => handleChange("password", value)}
          />
          <Button
            variant="main"
            type="submit"
            disabled={disabled}
            onClick={() => handleLogin}
          >
            Iniciar sesión
          </Button>

          <p className={styles.link_signup}>
            ¿No tienes cuenta?{" "}
            <Link className={styles.linkSignup} href={"/signup"}>
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

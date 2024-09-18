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
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
// import { Loading } from "../loading";


export function Login() {
  const router = useRouter()
  const { form, setForm, missing, setMissing, error, setError } = useForm();
  const [disabled, setDisabled] = useState<boolean>(false);

  const {setUser} = useUserStore();

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleInvalid = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;

    if (!form[input.name as keyof typeof form].trim()) {
      setMissing((prevMissing) => ({
        ...prevMissing,
        [input.name]: true,
      }));

      setError((prevError) => ({
        ...prevError,
        [input.name]: `El campo ${input.name} es obligatorio.`,
      }));
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error.password || error.email) return;

    try {
      setDisabled(true);
      const response = await login(form);
      console.log("respuesta de login", response);

      if (response.status === "success") {
        const { user, token } = response.payload;
        localStorage.setItem("token", token);
        window.localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        router.push('http://localhost:3000/componentes')
      }
      setDisabled(false);
    } catch (error: any) {

      if (error.message === "Network Error") {

        setError({ ...error, password: "Error de red, intente de nuevo más tarde." })
      } else {
        const dataError = error.response.data
        if (dataError.message.includes("User with email")) {
          setError({ ...error, email: "Correo no registrado" })
        } else if (dataError.message.includes("The user could not be validated")) {
          setError({ ...error, password: "Contraseña incorrecta." });
        } else {
          setError({ ...error, email: "Error al iniciar sesión. Inténtelo de nuevo." });
        }
      }
      console.log("response error:", error)

      setDisabled(false);
    }
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
            missing={missing.email}
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
            missing={missing.password}
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
            {/* {disabled? <Loading /> : "Iniciar sesión" } */}
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

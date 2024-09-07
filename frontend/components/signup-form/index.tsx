"use client"
import styles from "./styles.module.css";
import { useSignUpForm } from "@/hooks";
import { Button, Inputs } from "@/ui-atoms";
import Link from "next/link";
import { useState } from "react";
import MainLogo from "@/assets/logos/MainLogo";

export function SignupForm() {
    const {form, setForm, missing, setMissing, error, setError} = useSignUpForm();
    const [disabled, setDisabled] = useState<boolean>(false);
    const handleChange = (field: keyof typeof form, value:string):void => {
        setForm({
            ...form,
            [field]: value
        })
    };
    const handleInvalid = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        if(input.name == "email") setError({...error, email: "Ingresá un formato E-Mail válido"})
        if(form.password !== form.confirmPassword) setError({...error, confirmPassword: "Las contraseñas no coinciden"})
        setMissing({
            ...missing,
            [input.name]: true
        })
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        setDisabled(true);
        setError({username: "", email: "", password: "", confirmPassword: ""})
        setTimeout(() => {
            setDisabled(false)
        }, 2000);
    }
    return (
        <div className={styles.container}>
            <MainLogo/>
            <h1 className={styles.title}>¡Bienvenido!</h1>
            <h4 className={styles.subtitle}>Nos alegra conocerte.</h4>
            <form className={styles.form} onInvalid={handleInvalid} onSubmit={handleSubmit}>
                <Inputs
                    label="Nombre de usuario"
                    name="username"
                    type="text"
                    value={form.username}
                    missing={missing.username}
                    required={true}
                    disabled={disabled}
                    errorMessage={error.username}
                    onChange={(value:string) => handleChange("username", value)}
                />
                <Inputs
                    label="E-Mail"
                    name="email"
                    type="email"
                    value={form.email}
                    missing={missing.email}
                    required={true}
                    disabled={disabled}
                    errorMessage={error.email}
                    onChange={(value:string) => handleChange("email", value)}
                />
                <Inputs
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={form.password}
                    missing={missing.password}
                    required={true}
                    disabled={disabled}
                    errorMessage={error.password}
                    onChange={(value:string) => handleChange("password", value)}
                />
                <Inputs
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    missing={missing.confirmPassword}
                    required={true}
                    disabled={disabled}
                    errorMessage={error.confirmPassword}
                    onChange={(value:string) => handleChange("confirmPassword", value)}
                />
                <Button
                    variant="main"
                    disabled={disabled || Object.values(form).some(item => item == "")}
                    type="submit"
                    onClick={()=>handleSubmit}
                >Iniciar sesión</Button>
            </form>
            <p className={styles.login}>¿Ya tienes cuenta? <Link className={styles.login_link} href={"/login"}>Inicia sesión</Link></p>
            <p className={styles.terms}>Al iniciar sesión, estás aceptando nuestros <Link className={styles.terms_link} href={"/terms"}>Terminos y Condiciones</Link></p>
        </div>
    );
};
                        
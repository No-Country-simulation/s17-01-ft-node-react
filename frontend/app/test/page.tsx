"use client";
import styles from "./styles.module.css"
import { Button, Inputs } from "@/ui-atoms";
import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";

// Simulación de hook para probar estados del Input
function useSignUp() {
    const [form, setForm] = useState<{email:string, password:string, confirmPassword: string}>({email: "", password: "", confirmPassword: ""});
    const [missing, setMissing] = useState<{email:boolean, password:boolean, confirmPassword:boolean}>({email: false, password: false, confirmPassword: false});
    const [error, setError] = useState<{email:string, password:string, confirmPassword:string}>({email: "", password: "", confirmPassword: ""});
    return {form, setForm, missing, setMissing, error, setError}
};

export default function Page() {
    const [disabled, setDisabled] = useState<boolean>(false);
    const {form, setForm, missing, setMissing, error, setError} = useSignUp();

    const handleChange = (fieldName: "email" | "password" | "confirmPassword", value:string):void => {
        setForm({
            ...form,
            [fieldName]: value,
        });
    };
    const handleInvalid = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        setMissing({
            ...missing,
            [input.name]: true,
        });
        if(input.name == "email") {
            setError({
                ...error,
                email: "Ingresá un formato email",
            })
        }
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        if(form.password !== form.confirmPassword) {
            setError({
                ...error,
                confirmPassword: "Las contraseñas no coinciden"
            });
        }
    }
    const handleDisabled = () => {
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 2500);
    };
    useEffect(()=>{
        setError({
            ...error,
            email: ""
        })
    }, [form.email])
    return (
        <section>
            <form onInvalid={handleInvalid} onSubmit={handleSubmit} className={styles.buttons_container}>
                <Inputs
                    label="E-Mail"
                    name="email"
                    type="email"
                    missing={missing.email}
                    disabled={disabled}
                    required={true}
                    placeholder="ej. ejempo@gmail.com"
                    value={form.email}
                    errorMessage={error.email}
                    onChange={(value:string)=>handleChange("email", value)}
                />
                <Inputs
                    label="Contraseña"
                    name="password"
                    type="password"
                    missing={missing.password}
                    disabled={disabled}
                    required={true}
                    value={form.password}
                    errorMessage={error.password}
                    onChange={(value:string)=>handleChange("password", value)}
                />
                <Inputs
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    type="password"
                    missing={missing.confirmPassword}
                    disabled={disabled}
                    required={true}
                    value={form.confirmPassword}
                    errorMessage={error.confirmPassword}
                    onChange={(value:string)=>handleChange("confirmPassword", value)}
                />
                <Button variant="main" type="submit" onClick={()=>handleSubmit}>Registrarme</Button>
            </form>
            <div className={styles.buttons_container}>
                <Button variant="main" disabled={disabled} onClick={handleDisabled}>Main Button</Button>
                <Button variant="secondary" disabled={disabled} onClick={()=>console.log("Secondary Button")}>Secondary Button</Button>
                <Button variant="tertiary" disabled={disabled} onClick={()=>console.log("Secondary Icon Button")}>Tertiary</Button>
                <Button variant="mainIcon" disabled={disabled} onClick={()=>console.log("Tertiary Button")}><Send size={20}/></Button>
                <Button variant="secondaryIcon" disabled={disabled} onClick={()=>console.log("Main Icon Button")}><Send size={20}/></Button>
                <Button variant="tertiaryIcon" disabled={disabled} onClick={()=>console.log("Tertiary Icon Button")}><Send size={20}/></Button>
                <Button variant="text" disabled={disabled} onClick={()=>console.log("Text Button")}>Text Button</Button>
            </div>
        </section>
    )
}
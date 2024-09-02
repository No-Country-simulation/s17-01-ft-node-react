"use client";
import styles from "./styles.module.css"
import { Button, Inputs } from "@/ui-atoms";
import React, { useState } from "react";
import { Send } from "lucide-react";

export default function Page() {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [testForm, setTestForm] = useState<{value:string, missing: boolean}>({value: "", missing: false});
    const handleChange = (value:string) => {
        setTestForm({
            value,
            missing: false
        })
    };
    const handleInvalid = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        setTestForm({
            ...testForm,
            missing: true
        })
    };
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
    }
    return (
        <section>
            <form onInvalid={handleInvalid} onSubmit={handleSubmit} className={styles.buttons_container}>
                <Inputs
                    name="name"
                    type="text"
                    missing={testForm.missing}
                    disabled={disabled}
                    required={true}
                    placeholder="ej. Thiago Salaberry"
                    value={testForm.value}
                    onChange={(value:string) => handleChange(value)}
                />
                <Inputs
                    label="Nombre"
                    name="name"
                    type="text"
                    missing={testForm.missing}
                    disabled={disabled}
                    required={true}
                    placeholder="ej. Thiago Salaberry"
                    value={testForm.value}
                    onChange={(value:string) => handleChange(value)}
                />
            </form>
            <div className={styles.buttons_container}>
                <Button variant="main" disabled={disabled} onClick={()=>console.log("Main Button")}>Main Button</Button>
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
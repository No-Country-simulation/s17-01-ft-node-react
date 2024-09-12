"use client";

import styles from "./styles.module.css";
import { Inputs } from "@/ui-atoms";
import { Button } from "@/ui-atoms";

export default function page() {
    return (
        <div className={styles.inputs_container}>
            <div className={styles.field_text_login}>
                <div className={styles.login_tittle}>
                    <h1>Cambio de contraseña</h1>
                    <p>Ingresa tu nueva contraseña</p>
                </div>
                <Inputs
                    type="text"
                    placeholder="Nueva contraseña"
                    onChange={() => {}}
                    name="email"
                />
                <Inputs
                    type="text"
                    placeholder="Repetir contraseña"
                    onChange={() => {}}
                    name="email"
                />
            </div>
            <div className={styles.buttonContainer}>
                <div>
                    <Button variant="main" type="submit" onClick={() => {}}>
                        Enviar código
                    </Button>
                </div>
            </div>
        </div>
    );
}

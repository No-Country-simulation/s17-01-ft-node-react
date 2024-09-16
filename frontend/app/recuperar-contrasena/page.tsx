"use client";

import styles from "./styles.module.css";
import { Inputs } from "@/ui-atoms";
import { Button } from "@/ui-atoms";

export default function page() {
    return (
        <div className={styles.inputs_container}>
            <div className={styles.field_text_login}>
                <div className={styles.login_tittle}>
                    <h1>Restablecer tu contraseña</h1>
                    <p>Ingresa tu correo electrónico</p>
                </div>
                <Inputs
                    type="text"
                    placeholder="Correo electrónico"
                    onChange={() => {}}
                    name="email"
                />
            </div>
            <div className={styles.buttonContainer}>
                <div>
                    <Button variant="tertiary" onClick={() => {}}>
                        Cancelar
                    </Button>
                </div>
                <div>
                    <Button variant="main" type="submit" onClick={() => {}}>
                        Enviar código
                    </Button>
                </div>
            </div>
        </div>
    );
}

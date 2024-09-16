"use client";

import styles from "./styles.module.css";
import { Inputs } from "@/ui-atoms";
import { Button } from "@/ui-atoms";

export default function page() {
    return (
        <div className={styles.inputs_container}>
            <div className={styles.field_text_login}>
                <div className={styles.login_tittle}>
                    <h1>¡Enviado! ✅</h1>
                    <p>
                        Te hemos enviado un email. ¡Revisa tu bandeja de
                        entrada!
                    </p>
                    <p>
                        <span style={{ fontWeight: 600 }}>
                            ¿No has recibido el email?{" "}
                        </span>{" "}
                        Revisa tu carpeta de spam para asegurarte de que el
                        email no está ahí.
                    </p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <div>
                    <Button variant="tertiary" onClick={() => {}}>
                        Probar otro correo
                    </Button>
                </div>
                <div>
                    <Button variant="main" type="submit" onClick={() => {}}>
                        Reenviar código
                    </Button>
                </div>
            </div>
        </div>
    );
}

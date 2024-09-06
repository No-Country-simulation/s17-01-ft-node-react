import styles from "./styles.module.css";
import MainLogo from "@/assets/logos/MainLogo";

export default function passwordRecovery() {
    return (
        <div className={styles.container}>
            <div className={styles["form-container"]}>
                <form>
                    <MainLogo />
                    <h1>Restablecer tu contraseña</h1>
                    <p>Ingresa tu correo electrónico</p>
                    <input type="text" placeholder="Correo electrónico" />
                </form>
            </div>
        </div>
    );
}

import styles from "./styles.module.css";
import MainLogo from "@/assets/logos/MainLogo";

export default  function LayoutReenviarMessage ({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <div className={styles.field_login}>
                <form className={styles.field_inputs}>
                    <MainLogo />
                    {children}
                </form>
                <div className={styles.helpSection}>
                    <div className={styles.helpElement}>Necesito ayuda</div>
                    <div className={styles.helpElement}>
                        Politica de privacidad
                    </div>
                    <div className={styles.helpElement}>Contacto</div>
                </div>
            </div>
        </div>
    );
}

import Image from "next/image";
import styles from "./styles.module.css";

export function UseDetails() {
    return (
        <div className={styles.container}>
            <div className={styles.leftColumn}>
                <div className={styles.leftBox1}>
                    <h1 className={styles.h1}>Los mejores componentes a tu alcance</h1>
                    <p className={styles.p}>Adquiere el código React de tus componentes favoritos y elige uno de nuestros planes de suscripción para obtener acceso mensual a componentes exclusivos.</p>
                </div>
                <div className={styles.leftBox2}>
                    <h1 className={styles.h1}>Descarga</h1>
                    <p className={styles.p}>Descarga el código React del componente y utilízalo en tus proyectos con total libertad.</p>
                </div>
            </div>
            <div className={styles.rightBox}>
                <Image src="/Use.png" width={549} height={435} quality={100} alt="use" />
                <h1 className={styles.h1}>Vende tus creaciones</h1>
                <p className={styles.p}>Si eres desarrollador, convierte tu creatividad en ingresos vendiendo tus propios componentes en CodePieces.</p>
            </div>
        </div>
    );
}

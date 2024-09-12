import styles from "./styles.module.css";

export function Loading() {
    return (
        <div className={styles.container}>
            <span className={`${styles.span} ${styles.light}`}></span>
            <span className={`${styles.span} ${styles.dark}`}></span>
            <span className={`${styles.span} ${styles.light}`}></span>
            <span className={`${styles.span} ${styles.dark}`}></span>
        </div>
    );
};
                        
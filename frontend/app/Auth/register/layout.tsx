"use client";
import styles from "./styles.module.css";


export default function RegisterLayout({children}: {children: React.ReactNode}) {
    
    return (
        <div className={styles.layout}>
            
            <main className={styles.layout_main}>{children}</main>
           
        </div>
    )
};
                        
"use client";
import styles from "./styles.module.css";


export default function LogInLayout({children}: {children: React.ReactNode}) {
    
    return (
        <div className={styles.layout}>
          
            <main className={styles.layout_main}>{children}</main>
          
        </div>
    )
};
                        
"use client";
import { Activity, Wallet, Grid2x2X } from "lucide-react";
import styles from "./styles.module.css";
import { useState } from "react";
import { ManagementTable } from "@/components";

export default function Page() {
    const [current, setCurrent] = useState<"Contenido" | "Estadísticas" | "Billetera">("Contenido");
    return (
        <div className={styles.page}>
            <section className={styles.selector_section}>
                <p className={styles.selector_desc}>Revisa tus productos</p>
                <nav className={styles.nav}>
                    <ul className={styles.nav_list}>
                        <li className={styles.nav_item}>
                            <Selector onClick={()=>setCurrent("Contenido")} current={current == "Contenido"}><Grid2x2X size={20} />Contenido</Selector>
                        </li>
                        <li className={styles.nav_item}>
                            <Selector onClick={()=>setCurrent("Estadísticas")} current={current == "Estadísticas"}><Activity size={20} />Estadísticas</Selector>
                        </li>
                        <li className={styles.nav_item}>
                            <Selector onClick={()=>setCurrent("Billetera")} current={current == "Billetera"}><Wallet size={20} />Billetera</Selector>
                        </li>
                    </ul>
                </nav>
            </section>
            <section className={styles.table_section}>
                <p className={styles.selector_desc}>{current}</p>
                <ManagementTable data={dataMock} current={current}/>
            </section>
        </div>
    )
};
const dataMock = [
    {
        title: "Backdrop",
        date: new Date(),
        views: 1000,
        rating: 4.3
    },
    {
        title: "Pagination",
        date: new Date(),
        views: 3494,
        rating: 4
    },
    {
        title: "Calendar",
        date: new Date(),
        views: 1726537,
        rating: 5
    },
]
type SelectorProps = {
    children: React.ReactNode;
    current: boolean;
    onClick: () => void;
}
function Selector(props:SelectorProps) {
    return (
        <button
            className={`
                ${styles.selector}
                ${props.current && styles.current}
            `}
            onClick={props.onClick}
            >
            {props.children}
        </button>
    )
}
import styles from "./styles.module.css"
import { ButtonProps } from "@/lib/types"
import { outfit } from "@/lib/fonts"

export function Button(props:ButtonProps) {
    return (
        <button className={`${styles.button} ${outfit.className}`}>Button</button>
    )
}
import { X } from "lucide-react";
import styles from "./StepHeader.module.css";
interface StepHeaderProps {
    title: string;
    handleClick: () => void;
}
export function StepHeader({title,handleClick}: StepHeaderProps) {
    return (
        <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.closeButton} onClick={handleClick}>
                <X />
            </button>
        </div>
    );
}
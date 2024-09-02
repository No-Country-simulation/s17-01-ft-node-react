import styles from "./styles.module.css"
import { ButtonProps } from "@/lib/types"
import { outfit } from "@/lib/fonts"
import { medium } from "@/utils/fonts/fonts"

export function Button(props:ButtonProps) {
    const isIcon = props.variant == "mainIcon" || props.variant == "secondaryIcon" || props.variant == "tertiaryIcon"; 
    const handleClick = () => {
        props.onClick();
    };
    // const handleTouchStart = (e:React.TouchEvent) => {
    //     e.preventDefault();
    //     console.log("Click: ", e.type)
    // }
    // const handleTouchEnd = () => {
    //     console.log("Termina el tap")
    // }
    // const handleEventType = (e:React.MouseEvent) => {
    //     console.log(e.type)
    // }
    return (
        <button
            className={`
                ${styles[props.variant]}
                ${styles.button}
                ${isIcon && styles.icon}
                ${props.disabled && styles.disabled}
                ${medium.className}
            `}
            type={props.type == "submit" ? "submit" : "button"}
            id={props.id || ""}
            onClick={handleClick}
            // onTouchEnd={handleTouchEnd}
            disabled={props.disabled}
        >{props.children}</button>
    )
}
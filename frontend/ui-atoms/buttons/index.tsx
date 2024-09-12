import styles from "./styles.module.css"
import { ButtonProps } from "@/lib/types"
import { medium } from "@/utils/fonts/fonts"
import { useRef } from "react";

export function Button(props:ButtonProps) {
    const isIcon = props.variant == "mainIcon" || props.variant == "secondaryIcon" || props.variant == "tertiaryIcon";
    const rippleButtonRef = useRef<HTMLButtonElement>(null);
    const handleClick = (e:React.MouseEvent) => {
        if(props.disabled) return;
        if(props.variant !== "text") {
            const ripple = document.createElement("span");
            ripple.className = styles.ripple;
            ripple.style.left = `${e.clientX - rippleButtonRef.current?.offsetLeft!}px`;
            ripple.style.top = `${e.clientY - rippleButtonRef.current?.offsetTop!}px`;
            rippleButtonRef.current?.appendChild(ripple);
            setTimeout(() => {
                rippleButtonRef.current?.removeChild(ripple);
            }, 750)
        }
        props.onClick();
    };
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
            disabled={props.disabled}
            ref={rippleButtonRef}
        >
            {props.children}
        </button>
    )
}
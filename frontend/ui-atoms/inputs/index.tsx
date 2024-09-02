import { InputProps } from "@/lib/types";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { regular } from "@/utils/fonts/fonts";

export function Inputs(props:InputProps) {
    const [focusing, setFocusing] = useState<boolean>(false);
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        const inputValue:string = e.target.value;
        props.onChange(inputValue);
    }
    useEffect(()=>{
        console.log({focusing})
    }, [focusing])
    return (
        <div className={styles.input_container}>
            {props.label && (
                <label
                    htmlFor={props.name}
                    className={`${styles.label} ${(focusing || props.value) && styles.focusing}`}
                >{props.label}</label>
            )}
            <input
                type={props.type}
                name={props.name}
                value={props.value}
                placeholder={!props.label && props.placeholder || ""}
                id={props.id}
                required={props.required}
                disabled={props.disabled}
                onChange={handleChange}
                onFocus={()=>setFocusing(true)}
                onBlur={()=>setFocusing(false)}
                className={`
                    ${styles.input}
                    ${regular.className}
                    ${props.missing && styles.missing}
                    ${props.value && styles.valued}
                    ${props.disabled && styles.disabled}
                `}
                onFocusCapture={()=>setFocusing(true)}
                onBlurCapture={()=>setFocusing(false)}
            />
        </div>
    );
};
                        
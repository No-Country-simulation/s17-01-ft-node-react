import { InputProps } from "@/lib/types";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { regular } from "@/utils/fonts/fonts";
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react";

export function Inputs(props: InputProps) {
  const [focusing, setFocusing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = e.target.value;
    props.onChange(inputValue);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.input_container}>
        {props.label && (
          <label
            htmlFor={props.name}
            className={`${styles.label} ${(focusing || props.value) && styles.focusing}`}
          >
            {props.label}
          </label>
        )}
        <input
          type={
            props.type !== "password"
              ? props.type
              : showPassword
                ? "text"
                : "password"
          }
          name={props.name}
          value={props.value}
          placeholder={(!props.label && props.placeholder) || ""}
          id={props.id}
          required={props.required}
          disabled={props.disabled}
          onChange={handleChange}
          onFocus={() => setFocusing(true)}
          onBlur={() => setFocusing(false)}
          className={`
                        ${styles.input}
                        ${regular.className}
                        ${!props.value && props.missing && styles.missing}
                        ${props.value && styles.valued}
                        ${props.disabled && styles.disabled}
                        ${props.errorMessage && styles.error}
                    `}
          onFocusCapture={() => setFocusing(true)}
          onBlurCapture={() => setFocusing(false)}
        />
        {props.type == "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.clear_button}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        {/* {props.value && (
                    <div className={styles.icon_container}>
                        {status == "success" ? <CheckCircle color="var(--color-primary)" size={15}/> : <XCircle color="var(--color-error)" size={15}/>}
                    </div>
                )} */}
      </div>
      <p className={styles.error_message}>
        {!props.value && props.missing
          ? "Completá este campo"
          : props.errorMessage
            ? props.errorMessage
            : ""}
      </p>
    </div>
  );
}

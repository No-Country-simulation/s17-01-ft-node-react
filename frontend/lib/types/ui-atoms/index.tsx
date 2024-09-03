export type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit"
    id?: string;
    disabled?: boolean;
    variant: "main" | "secondary" | "tertiary" | "mainIcon" | "secondaryIcon" | "tertiaryIcon" | "text";
    onClick: () => void;
}
export type InputProps = {
    label?: string;
    type: "text" | "number" | "email" | "password";
    name: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    id?: string;
    missing?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    onChange: (value:string) => void;
}
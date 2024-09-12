export type LoginFormProps = {
    
}
export type CardProps = {

}
export type PricingCardProps = {
    title: string;
    description: string;
    price: string;
    limit: string;
    benefits: string[];
    button: {
        variant: "main" | "secondary";
        text: string;
    }
    recommended: boolean;
    onClick: () => void;
}
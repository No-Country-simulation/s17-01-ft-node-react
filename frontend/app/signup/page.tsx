"use client";
import styles from "./styles.module.css";
import { SignupForm } from "@/components";
import Image from "next/image";
import signupImage from "@/public/images/signup_image.png";

export default function Page() {
    
    return (
        <div className={styles.page}>
            <SignupForm/>
            <div className={styles.image_container}>
                <Image src={signupImage} alt="signup_image.png" style={{width: "100%", height: "100%"}}/>
            </div>
        </div>
    )
};
                        
"use client";
import styles from "./styles.module.css";
import { SignupForm } from "@/components";
import Image from "next/image";
import signupImage from "@/public/images/signup_image.png";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.form_container}>
        <SignupForm />
        <div className={styles.image_container}>
          {/* <Image src={signupImage} alt="signup_image.png" quality={100} style={{width: "auto", height: "100%"}}/> */}
          <img
            className={styles.img}
            src="/signup_image.png"
            alt="signup_image"
          />
        </div>
      </div>
    </div>
  );
}

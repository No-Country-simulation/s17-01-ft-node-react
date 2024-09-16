import Image from "next/image";
import styles from "./styles.module.css";
import GooglePlaySVG from "@/assets/icons/GooglePlaySvg";
import AppleStoreSVG from "@/assets/icons/AppleStoreSvg";

export function DownloadApp() {
  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <h1 className={styles.h1}>
          Descarga <br />
          nuestra app
        </h1>
        <p className={styles.p}>
          Descarga nuestra app para seguir descargando y compartiendo tus
          componentes favoritos.
        </p>
        <button className={styles.button1}>
          <AppleStoreSVG className={styles.icon1} />
          <span className={styles.text}>Apple Store</span>
        </button>
        <button className={styles.button2}>
          <GooglePlaySVG className={styles.icon2} />
          <span className={styles.text}>Google Play</span>
        </button>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.box2}>
        <Image
          src="/Download.png"
          width={574}
          height={362}
          quality={100}
          alt="download"
        />
      </div>
    </div>
  );
}
